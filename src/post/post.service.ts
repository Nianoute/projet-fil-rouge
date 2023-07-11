import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { uploadFileSupabase } from 'src/supabaseclient';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(data, user, files: any) {
    try {
      data.author = user.id;
      //files
      let error = false;
      if (files) {
        if (files.length > 0) {
          const size = files[0].size;
          if (size > 1000000) {
            error = true;
          }
          const file = await uploadFileSupabase(files, 'posts');
          if (file.error) {
            error = true;
          } else {
            data.imagePost =
              'https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/posts/' +
              file.data.path;
          }
        } else {
          data.imagePost = '';
        }
      } else {
        data.imagePost = '';
      }
      return await this.postRepository.save(data);
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
      .leftJoinAndSelect('comments.author', 'authorComment')
      .leftJoinAndSelect('post.postVariants', 'postVariants')
      .leftJoinAndSelect('post.likesPost', 'likesPost');

    if (categories !== undefined && categories !== '') {
      query.where('categories.name IN (:...categories)', {
        categories: categories.split(','),
      });
    }

    if (title !== undefined && title !== '') {
      query.andWhere('post.title like :title', { title: '%' + title + '%' });
    }

    const postList = query.orderBy('post.createdAt', 'DESC').getMany();
    try {
      return postList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
    }
  }

  async findAllByUser(userId: number) {
    const query = this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.categories', 'categories')
    .leftJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.comments', 'comments')
    .leftJoinAndSelect('comments.author', 'authorComment')
    .leftJoinAndSelect('post.postVariants', 'postVariants')
    .leftJoinAndSelect('post.likesPost', 'likesPost')
    .where('post.author = :userId', { userId });

    const postList = query.orderBy('post.createdAt', 'DESC').getMany();
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
      .leftJoinAndSelect('post.postVariants', 'postVariants');

    const postList = query
      .orderBy('post.createdAt', 'DESC')
      .where('post.id = :id', { id: id })
      .getOne();

    try {
      return postList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
    }
  }

  async update(id: number, data: UpdatePostDto, user) {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.id = :id', { id: id });

    const post = await query.getOne();
    
    if (!post) {
      throw new NotFoundException(`Le post d'id ${id} n'existe pas.`);
    }

    if (post.author.id !== user.id) {
      throw new NotFoundException(`Vous n'êtes pas l'auteur de ce post.`);
    }
    
    const postUpdate = { ...post, ...data };

    try {
      return await this.postRepository.save(postUpdate);
    } catch (error) {
      console.log(error);
      return error['detail'];
    }
  }

  async softDelete(id: number, user) {
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.id = :id', { id: id });

    const post = await query.getOne();

    if (!post) {
      throw new NotFoundException(`Le post d'id ${id} n'existe pas.`);
    }

    if (post.author.id !== user.id) {
      throw new NotFoundException(`Vous n'êtes pas l'auteur de ce post.`);
    }

    try {
      return await this.postRepository.softDelete(id);
    }
    catch (error) {
      console.log(error);
      return error['detail'];
    }
  }
}
