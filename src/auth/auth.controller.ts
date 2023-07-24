import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { CreateTokenResetPasswordDto } from 'src/token-reset-password/dto/create-token-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  @UseInterceptors(FilesInterceptor('file'))
  signup(
    @Body() signupAuthDto: SignupAuthDto,
    @UploadedFiles() file
  ) {
    return this.authService.signup(signupAuthDto, file);
  }

  @Post("signin")
  signin(@Body() signinAuthDto: SigninAuthDto) {
    return this.authService.signin(signinAuthDto);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() createTokenResetPasswordDto: CreateTokenResetPasswordDto,
  ) {
    return this.authService.forgotPassword(createTokenResetPasswordDto);
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }
}
