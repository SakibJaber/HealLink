import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as randomToken from 'random-token';
import { Request } from 'express';
import { MailerService } from './mailer.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { PasswordReset } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto, req: Request) {
    const { email, password } = loginDto;

    // Step 1: Find the user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Step 2: Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or [password]');
    }

    // Step 3: Ensure the email is verified
    if (user.email_status !== 'verified') {
      throw new UnauthorizedException('Email not verified');
    }

    // Step 4: Save session data
    req.session.userId = user.id; // Save user ID to session
    // req.session.userRole = user.role; // Optional: Save role if needed

    // Step 5: Return success response (without sensitive data)
    const {
      password: _,
      verification_token,
      ...userWithoutSensitiveInfo
    } = user;
    return {
      message: 'Login successful',
      user: userWithoutSensitiveInfo,
    };
  }

  async signup(signupDto: CreateUserDto) {
    const { username, email, password } = signupDto;
    const token = randomToken(8);

    // Pass everything except verification_token to create the user
    const user = await this.usersService.create({
      username,
      email,
      password,
    });

    // Handle setting the verification_token directly in the service or repository
    user.verification_token = token;
    await this.usersService.update(user.id, user); // Save the token in the DB

    await this.mailerService.sendVerificationEmail(
      username,
      email,
      user.id,
      token,
    );
    return { message: 'Check your email for verification instructions.' };
  }

  async logout(req: Request): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(new Error('Logout failed'));
        } else {
          resolve({ message: 'Logout successful' });
        }
      });
    });
  }

  async generateResetToken(email: string) {
    // Check if the user exists
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User with this email does not exist.');
    }

    // Generate a reset token and its expiration
    const resetToken = randomToken(9);
    // const hashedToken = await bcrypt.hash(resetToken, 10);
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getMinutes() + 5); // Token valid for 5 min

    // Save the hashed token and expiry to the database
    await this.passwordResetRepository.save({
      userId: user.id,
      token: resetToken,
      expiresAt: tokenExpiry,
    });

    // Send the reset email
    await this.mailerService.sendResetPasswordEmail(
      user.username,
      user.email,
      resetToken,
    );
  }

  async resetPassword(token: string, newPassword: string) {
    if (!newPassword) {
      throw new Error('New password is required.');
    }

    // Fetch the token record with matching token and valid expiration
    const resetRecord = await this.passwordResetRepository.findOne({
      where: {
        token,
        expiresAt: MoreThanOrEqual(new Date()), // Ensure token is not expired
      },
    });

    if (!resetRecord) {
      throw new Error('Invalid or expired reset token.');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user record with the new hashed password
    await this.usersService.update(resetRecord.userId, {
      password: hashedPassword,
    });

    // Delete the token record after successful reset
    await this.passwordResetRepository.delete({ id: resetRecord.id });

    return { message: 'Password has been successfully reset.' };
  }
}
