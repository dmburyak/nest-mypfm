import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Users } from './users/users.entity';
import { MoreThan } from 'typeorm';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const token = context.switchToHttp().getRequest().cookies['accessToken'];
    if (token === undefined) {
      this.sendUnauthorized();
    }
    const currentDate = new Date();
    const validTuDate = new Date(
      currentDate.setHours(currentDate.getHours() - 1),
    );
    const tokenToVerify = await Users.findOne({
      token: Number(token),
      expireDate: MoreThan(validTuDate),
    });
    if (tokenToVerify === undefined) {
      this.sendUnauthorized();
    }
    return next.handle();
  }

  sendUnauthorized() {
    throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}
