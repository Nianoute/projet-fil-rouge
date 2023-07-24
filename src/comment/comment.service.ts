import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) { }

  async create(data: CreateCommentDto, user) {
    data.author = user.id;
    return await this.commentRepository.save(data);
  }

  async findAll() {
    const query = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.children', 'children')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.author', 'author');

    const commentList = query.getMany();

    try {
      return await commentList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching comment');
    }
  }

  async findOne(id: number) {
    const query = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.children', 'children')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.post', 'post');

    const commentList = query.getOne();

    try {
      return await commentList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching comment');
    }
  }

  async findAllByPost(postId: number) {
    const query = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.children', 'children')
      .leftJoinAndSelect('children.author', 'childrenAuthor')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.post = :postId', { postId });

    const commentList = query.getMany();

    try {
      return await commentList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching comment');
    }
  }

  // async update(id: number, data: UpdateCommentDto, user) {
  //   const query = this.commentRepository
  //     .createQueryBuilder('comment')
  //     .leftJoinAndSelect('comment.author', 'author')
  //     .where('comment.id = :id', { id: id });

  //   const comment = await query.getOne();

  //   if (!comment) {
  //     throw new NotFoundException(`Le comment d'id ${id} n'existe pas.`);
  //   }

  //   if (comment.author.id !== user.id) {
  //     throw new NotFoundException(`Vous n'êtes pas l'auteur de ce comment.`);
  //   }

  //   const commentUpdate = { ...comment, ...data };

  //   try {
  //     return await this.commentRepository.save(commentUpdate);
  //   } catch (error) {
  //     console.log(error);
  //     return error['detail'];
  //   }
  // }
}
