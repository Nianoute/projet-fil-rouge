import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
) {}

  async create(data) {
    try {
        let error = false

        if (!error){
          return await this.postRepository.save(data);
        } else {
          throw new Error('Error while creating post');
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error while creating post');
    }
  }

  async findAll(queries) {
    let { categories, title } = queries;

    const query = this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.categories', 'categories')
        .leftJoinAndSelect('post.author', 'author')
        .leftJoinAndSelect('post.comments', 'comments')
        .leftJoinAndSelect('post.postVariants', 'postVariants')


    if(categories !== undefined && categories !== "") {
      query
          .where('categories.name IN (:...categories)', { categories: categories.split(',')})
    }

    if(title !== undefined && title !== "") {
      query
          .andWhere('post.title like :title', {title: '%' + title + '%' })
    }


    const postList = query
                        .orderBy('post.createdAt', 'DESC')
                        .getMany();

    
    try {
      return postList;
  } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
  }
  }

  async findOne(id: number) {

    const query = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.categories', 'categories')
        .leftJoinAndSelect('post.author', 'author')
        .leftJoinAndSelect('post.comments', 'comments')


    const postList = query
                        .orderBy('post.createdAt', 'DESC')
                        .where('post.id = :id', {id: id})
                        .getOne();

    try {
      return postList;
  } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
  }
  }

  async update(id: number, data: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });
    const postUpdate = { ...post, ...data }

    if (!post) {
        throw new NotFoundException(`Le post d'id ${id} n'existe pas.`);
    }

    try {
        return await this.postRepository.save(postUpdate);
    } catch (error) {
        console.log(error);
        return error['detail'];
    }
  }

  async softDelete(id: number) {
    return await this.postRepository.softDelete(id);
  }
}
