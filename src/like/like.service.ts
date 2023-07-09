import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  create(data: CreateLikeDto, user) {
    console.log('data', data);
    data.userLikes = user.id;
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
      .leftJoinAndSelect('like.userLikes', 'userLikes')
      .leftJoinAndSelect('like.postLikes', 'postLikes');
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
      .leftJoinAndSelect('like.userLikes', 'userLikes')
      .leftJoinAndSelect('like.postLikes', 'postLikes')
      .where('like.id = :id', { id: id });
    try {
      return query.getOne();
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting like');
    }
  }

  findAllByPostId(postId: number, user) {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.userLikes', 'userLikes')
      .leftJoinAndSelect('like.postLikes', 'postLikes')
      .where('like.postLikes = :postId', { postId: postId });

    const postVariantList = query.getMany();
    try {
      return postVariantList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
    }
  }

  findOneLikePostByUserId(postId: number, user) {
    const query = this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.userLikes', 'userLikes')
      .leftJoinAndSelect('like.postLikes', 'postLikes')
      .where('like.postLikes = :postId', { postId: postId })
      .andWhere('like.userLikes = :userId', { userId: user.id });

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
