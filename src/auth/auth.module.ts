import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { TokenResetPasswordService } from 'src/token-reset-password/token-reset-password.service';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TokenResetPasswordEntity } from 'src/token-reset-password/entities/token-reset-password.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '86400s' },
    }),
    MailModule,
    TypeOrmModule.forFeature([UserEntity, TokenResetPasswordEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService,TokenResetPasswordService, MailService]
})
export class AuthModule {}
