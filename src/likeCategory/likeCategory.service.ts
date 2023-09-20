import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeCategoryEntity } from './entities/likeCategory.entity';
import { CreateCategoryLikeDto } from './dto/create-likeCategory.dto';

@Injectable()
export class LikeCategoryService {
  constructor(
    @InjectRepository(LikeCategoryEntity)
    private readonly likeRepository: Repository<LikeCategoryEntity>,
  ) { }

  create(data: CreateCategoryLikeDto, user) {
    data.userCategoryLikes = user.id;
    try {
      return this.likeRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating like');
    }
  }

  findAll() {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.userCategoryLikes', 'userCategoryLikes')
      .leftJoinAndSelect('like.categoryLikes', 'categoryLikes');
    try {
      return query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting like');
    }
  }

  findOne(id: number) {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.userCategoryLikes', 'userCategoryLikes')
      .leftJoinAndSelect('like.categoryLikes', 'categoryLikes')
      .where('like.id = :id', { id: id });
    try {
      return query.getOne();
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting like');
    }
  }

  findAllByCategoryId(categoryId: number, user) {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.userCategoryLikes', 'userCategoryLikes')
      .leftJoinAndSelect('like.categoryLikes', 'categoryLikes')
      .where('like.categoryLikes = :categoryId', { categoryId: categoryId });

    const categoryLikeList = query.getMany();
    try {
      return categoryLikeList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting like category');
    }
  }

  findOneLikeCategoryByUserId(categoryId: number, user) {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.userCategoryLikes', 'userCategoryLikes')
      .leftJoinAndSelect('like.categoryLikes', 'categoryLikes')
      .where('like.categoryLikes = :categoryId', { categoryId: categoryId })
      .andWhere('like.userCategoryLikes = :userId', { userId: user.id });

    const like = query.getOne();
    try {
      return like;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
    }
  }

  async softDelete(id: number) {
    return await this.likeRepository.softDelete(id);
  }
}
