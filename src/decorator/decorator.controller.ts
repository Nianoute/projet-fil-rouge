import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Decorateur récupérable via @User
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({});
    const authToken = request.headers.authorization.split(' ')[1];
    const user = jwtService.decode(authToken);
    return user;
  },
);
