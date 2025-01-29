import {
  Controller,
  Post,
  Body,
  Query,
  BadRequestException,
  Render,
  Get,
  Res,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('signup')
  @Render('signup')
  getsignup(@Res() res: Response) {}

  @Get('login')
  @Render('login')
  getlogin(@Res() res: Response) {}



  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    try {
      const result = await this.authService.login(loginDto,req);
      return {
        message: 'Login successful',
        ...result, // Spread token data
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to login');
    }
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Get('verify')
  @Render('verify')
  verifyScreen() {}

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.logout(req);
      res.clearCookie('connect.sid'); // Clear session cookie (optional, depending on your setup)
      return res.status(200).json(result);
    } catch (error) {
      throw new BadRequestException('Failed to logout');
    }
  }

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

  @Get('reset-password')
  @Render('resetpassword')
  reqResetpass(@Res() res: Response) {}

  @Get('set-password')
  @Render('setpassword')
  setResetpass(@Res() res: Response) {}


  @Post('request-reset-password')
  async requestResetPassword(@Body('email') email: string) {
    try {
      await this.authService.generateResetToken(email);
      return { message: 'Password reset email sent successfully.' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('set-password')
  async setPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!token || !newPassword) {
      throw new Error('Token and new password are required.');
    }
  
    return await this.authService.resetPassword(token, newPassword);
  }
}
