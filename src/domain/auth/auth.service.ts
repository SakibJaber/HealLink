import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as randomToken from 'random-token';
import { SignupDto } from './dto/signup.dto';
import { MailerService } from './mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  // async signup(signupDto: SignupDto) {
  //   const { username, email, password } = signupDto;
  //   const token = randomToken(8); // Generate a random 8-character token

  //   const user = await this.usersService.create({
  //     username,
  //     email,
  //     password,
  //     verification_token: token,
  //   });

  //   await this.mailerService.sendVerificationEmail(username, email, user.id, token);
  //   return { message: 'Check your email for verification instructions.' };
  // }

  async signup(signupDto: SignupDto) {
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
