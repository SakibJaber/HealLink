import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as randomToken from 'random-token';
import { SignupDto } from './dto/signup.dto';
import { MailerService } from './mailer.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
  
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Step 1: Find the user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Step 2: Verify the password
     // Debug: Log user and password details
  console.log('User Retrieved:', user);
  console.log('Plaintext Password:', password);
  console.log('Hashed Password in DB:', user.password);

  // Step 2: Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('Password Match:', isPasswordValid);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or [password]');
    }

    // Step 3: Ensure the email is verified
    if (user.email_status !== 'verified') {
      throw new UnauthorizedException('Email not verified');
    }

    // Step 4: Return success response (without sensitive data)
    const { password: _, verification_token, ...userWithoutSensitiveInfo } = user;
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
      // Do not pass verification_token here
    });
  
    // Handle setting the verification_token directly in the service or repository
    user.verification_token = token;
    await this.usersService.update(user.id, user); // Save the token in the DB
    
    await this.mailerService.sendVerificationEmail(username, email, user.id, token);
    return { message: 'Check your email for verification instructions.' };
  }

  
  
}
