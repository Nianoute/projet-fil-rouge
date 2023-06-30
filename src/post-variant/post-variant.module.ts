import { Module } from '@nestjs/common';
import { PostVariantService } from './post-variant.service';
import { PostVariantController } from './post-variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostVariantEntity } from './entities/post-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostVariantEntity])
  ],
  controllers: [PostVariantController],
  providers: [PostVariantService]
})
export class PostVariantModule {}
