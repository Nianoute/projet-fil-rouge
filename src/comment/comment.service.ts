import { Injectable } from '@nestjs/common';
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
  ) {}

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

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
