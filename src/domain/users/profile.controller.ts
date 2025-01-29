import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionGuard } from '../auth/guards/session.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(SessionGuard)
  @Get()
  getProfile(@Req() req: Request) {
    return {
      message: 'Profile fetched successfully',
      userId: req.session.userId,
    };
  }

  @Get('check-session')
  checkSession(@Req() req: Request) {
    // Check if session data exists
    if (!req.session.userId) {
      throw new UnauthorizedException('Session not found');
    }

    return {
      message: 'Session is active',
      userId: req.session.userId,
    };
  }
}
