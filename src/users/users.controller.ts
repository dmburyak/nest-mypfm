import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.model';
import { find } from 'rxjs';

@Controller('login')
export class UsersController {
  @Post()
  find(@Body() user: User): string {
    return user.login;
  }
}
