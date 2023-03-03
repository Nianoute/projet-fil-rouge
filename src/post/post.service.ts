import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
) {}

  async create(data: CreatePostDto) {
    try {
      return await this.postRepository.save(data);
  } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
  }
  }

  async findAll() {
    try {
      return await this.postRepository.find();
  } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
  }
  }

  async findOne(id: number) {
    try {
      return await this.postRepository.findOneBy({id});
  } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
  }
  }

  async update(id: number, data: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });
    const postUpdate = { ...post, ...data };
    await this.postRepository.save(postUpdate);

    return postUpdate;
  }

  async softDelete(id: number) {
    return await this.postRepository.softDelete(id);
  }
}
