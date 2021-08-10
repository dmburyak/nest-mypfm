import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from './user.model';
import { Users } from './users.entity';

@Controller('login')
export class UsersController {
  @Post()
  // @HttpCode(204)
  async authorize(@Body() user: User): Promise<any> {
    const userToAuthorize = await Users.findOne({
      login: user.login,
      password: user.password,
    });
    userToAuthorize.token = Date.now().toString();
    console.log(userToAuthorize);
    if (userToAuthorize) {
      await userToAuthorize.save();
      return userToAuthorize.token;
    }
    return;
  }
}
