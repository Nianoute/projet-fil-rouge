import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/Signup-auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateTokenResetPasswordDto } from 'src/token-reset-password/dto/create-token-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';
import { TokenResetPasswordService } from 'src/token-reset-password/token-reset-password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenResetPasswordService: TokenResetPasswordService,
    private mailService: MailService
  ) {}

  signup(signupAuthDto: SignupAuthDto) {
    return this.userService.create(signupAuthDto);
}

async signin(signinAuthDto: SigninAuthDto) {
    const user = await this.validateUser(signinAuthDto);

    const payload = {
      email: user.email,
      id: user.id,
      userName: user.userName
    };

return {
  access_token: this.generateJwtToken(payload),
}
}

async validateUser(signinAuthDto : SigninAuthDto) {
  const user = await this.userService.findOneByEmail(signinAuthDto.email);

  if (!user) throw new Error('User not found')

  const validPassword = await bcrypt.compare(signinAuthDto.password, user.password);

  if (!validPassword) throw new Error('Invalid password')
  
  return user;
}

generateJwtToken(payload) {
  return this.jwtService.sign(payload);
}

async forgotPassword(
  createTokenResetPasswordDto: CreateTokenResetPasswordDto,
) {
  const token = await this.tokenResetPasswordService.create(
    createTokenResetPasswordDto,
  );

  this.mailService.create(createTokenResetPasswordDto, token.token);

  return `An email has been sent to ${createTokenResetPasswordDto.email}`;
}

async resetPassword(token: string, data: ResetPasswordDto) {
  const findToken = await this.tokenResetPasswordService.findOne(token);

  if (!findToken) {
    throw new HttpException('Token not found', 400);
  }

  const user = await this.userService.findOneByEmail(findToken.user.email);

  if (!user) {
    throw new HttpException('User not found', 400);
  }


  user.password = data.password;
  const updatedUser = await this.userService.update(
    +data.password,
    user,
  );

  await this.tokenResetPasswordService.remove(findToken.id);
    
  return updatedUser;
}

}
