import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index(): object {
    return { title: 'Title', subtitle: 'Subtitle' };
  }

  @Get('/hello')
  getsignup() {
    return 'hello world';
  }

}
