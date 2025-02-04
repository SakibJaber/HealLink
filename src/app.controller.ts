import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('')
  // @Render('home')
  // employee() {
  //   return { home: [] }; // Ensure 'employee' is always defined
  // }

  @Get('/hello')
  getsignup() {
    return 'hello world';
  }

}
