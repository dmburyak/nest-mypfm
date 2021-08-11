import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from './user.model';
import { Users } from './users.entity';
import { Response } from 'express';

@Controller('login')
export class UsersController {
  @Post()
  @HttpCode(202)
  async authorize(@Body() user: User, @Res() res: Response): Promise<any> {
    await new Promise((f) => setTimeout(f, 500));
    const userToAuthorize = await Users.findOne({
      login: user.login,
      password: user.password,
    });
    if (userToAuthorize === undefined) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    userToAuthorize.token = Math.floor((Math.random() + 1) * 1000000000);
    await userToAuthorize.save();
    res.cookie('accessToken', userToAuthorize.token, {
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      // sameSite: 'strict',
      // httpOnly: true,
    });
    return res.send();
  }
}
