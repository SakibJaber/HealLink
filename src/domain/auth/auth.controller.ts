import {
  Controller,
  Post,
  Body,
  Query,
  BadRequestException,
  Render,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('signup')
  @Render('signup')
  getsignup(@Res() res: Response) {
   
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Get('verify')
  @Render('verify')
  verifyScreen() {}

  @Post('verify')
  async verify(@Body('id') id: string, @Body('token') token: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (user.verification_token !== token) {
      throw new BadRequestException('Invalid token');
    }

    user.email_status = 'verified';
    user.verification_token = null;

    await this.usersService.update(user.id, user);

    return { message: 'Email verified successfully.' };
  }

  // @Post('verify')
  // async verify(@Query('id') id: string, @Query('token') token: string) {
  //   const user = await this.usersService.findOne(+id);

  //   if (user.verification_token !== token) {
  //     throw new BadRequestException('Invalid token');
  //   }

  //   user.email_status = 'verified';
  //   user.verification_token = null;
  //   await this.usersService.update(user.id, user);

  //   return { message: 'Email verified successfully.' };
  // }
}
