import { Body, Controller } from '@nestjs/common';
import { User } from './user.model';

@Controller('login')
export class UsersController {
  async find(@Body() user: User): Promise<any> {
    // const loginUser = new Users();
    return user.login;
  }
}
