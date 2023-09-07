import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const IS_GUEST_KEY = 'isGuest';
export const Guest = () => SetMetadata(IS_GUEST_KEY, true);

export const AuthUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as User;
  },
);
