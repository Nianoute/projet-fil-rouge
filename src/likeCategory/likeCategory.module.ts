import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeCategoryEntity } from './entities/likeCategory.entity';
import { LikeCategoryController } from './likeCategory.controller';
import { LikeCategoryService } from './likeCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikeCategoryEntity])],
  controllers: [LikeCategoryController],
  providers: [LikeCategoryService],
})
export class LikeCategoryModule { }
