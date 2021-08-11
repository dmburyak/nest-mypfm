import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.model';
import { Users } from './users.entity';
import { MoreThan } from 'typeorm';
import { AuthInterceptor } from '../auth.interceptor';
import { Response } from 'express';

@Controller('login')
@UseInterceptors(AuthInterceptor)
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
      expires: new Date(new Date().getTime() + 30 * 60 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    // return userToAuthorize.token;
    return res.send();
  }

  @Post(':token')
  @HttpCode(202)
  async findOne(@Param('token') token: string): Promise<any> {
    const currentDate = new Date();
    const validTuDate = new Date(
      currentDate.setHours(currentDate.getHours() - 1),
    );
    const tokenToVerify = await Users.findOne({
      token: Number(token),
      expireDate: MoreThan(validTuDate),
    });
    if (tokenToVerify === undefined) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
