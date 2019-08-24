import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest();
    if (user && user.seller) {
      return true;
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
