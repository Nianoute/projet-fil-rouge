import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateTokenResetPasswordDto } from 'src/token-reset-password/dto/create-token-reset-password.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'PoL : Mail de confirmation',
      // template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        // name: user.userName,
        // url,

      },
      //email content
      html: `<h1>Hi ${user.userName}</h1><br/><p>Please click on the following <a href="${url}">link</a> to confirm your account.</p>`,
    });    
  }

  async create(createTokenResetPasswordDto: CreateTokenResetPasswordDto, token: string) {
    const url = `http://localhost:3000/reset-password/${token}`;
    console.log({token, "email": createTokenResetPasswordDto.email});

    
    await this.mailerService.sendMail({
      to: createTokenResetPasswordDto.email,
      // from: '"Support Team" <
      subject: 'STYDYJob : Mail de changement de mot de passe',
      // template: './reset-password', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        // url,
      },
      //email content
      html: `<h1>Hi ${createTokenResetPasswordDto.email}</h1><br/><p>Please click on the following <a href="${url}">link</a> to reset your password.</p>`,
    });

    return { message: `Mail envoyé à ${createTokenResetPasswordDto.email}`};
  }
}