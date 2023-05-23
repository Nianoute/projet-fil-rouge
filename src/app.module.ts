import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';
import { TokenResetPasswordModule } from './token-reset-password/token-reset-password.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { VariantModule } from './variant/variant.module';
import { ShopModule } from './shop/shop.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    PostModule,
    CategoryModule,
    MailModule,
    TokenResetPasswordModule,
    SubCategoryModule,
    VariantModule,
    ShopModule,
    CommentModule,
    LikeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
