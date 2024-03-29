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
  ) { }

  async create(data, user, files: any) {
    try {
      data.author = user.id;

      let error = false;
      if (files) {
        if (files.length > 0) {
          console.log(files.length);
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

      if (error) {
        throw new Error('Le fichier est trop volumineux');
      }

      if (data.promoPrice !== null) {
        if (data.price !== 0 && data.price !== null && data.price !== undefined) {
          if (data.price <= data.promoPrice) {
            throw new Error('Le prix promo ne peut pas être supérieur ou égal au prix normal');
          }
        }
      }


      if (data.promoDuration !== null && data.promoDuration !== '') {
        const date = new Date(data.promoDuration);
        if (date < new Date()) {
          throw new Error('La date de fin de promo ne peut pas être inférieure à la date du jour');
        }
      }

      return await this.postRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
    }
  }

  async findAll(queries) {
    let { categories, title, like, date } = queries;

    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'authorComment')
      .leftJoinAndSelect('post.postVariants', 'postVariants')
      .leftJoinAndSelect('post.likesPost', 'likesPost')


    if (categories !== undefined && categories !== '') {
      query.where('categories.name IN (:...categories)', {
        categories: categories.split(','),
      });
    }

    if (title !== undefined && title !== '') {
      query.andWhere('post.title like :title', { title: '%' + title + '%' });
    }

    if (date !== undefined && date !== '') {
      if (date === "asc") {
        query.orderBy('post.createdAt', 'ASC');
      }
      if (date === "desc") {
        query.orderBy('post.createdAt', 'DESC');
      }
    }


    const postList = query.getMany();
    if (like === "like") {
      postList.then((posts) => {
        posts.sort((a, b) => {
          return b.likesPost.length - a.likesPost.length;
        });
      });
    }

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

  async update(id: number, data: UpdatePostDto, user, files) {
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

      if (error) {
        throw new Error('Le fichier est trop volumineux');
      }

      if (data.promoPrice !== null) {
        console.log(data.price);
        if (data.price !== 0 && data.price !== null && data.price !== undefined) {
          if (data.price <= data.promoPrice) {
            throw new Error('Le prix promo ne peut pas être supérieur ou égal au prix normal');
          }
        }
      }

      if (data.promoDuration !== null && data.promoDuration !== '') {
        const date = new Date(data.promoDuration);
        if (date < new Date()) {
          throw new Error('La date de fin de promo ne peut pas être inférieure à la date du jour');
        }
      }

      const postUpdate = { ...post, ...data };
      return await this.postRepository.save(postUpdate);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
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

    if (post.author.id !== user.id && user.admin === false) {
      throw new NotFoundException(`Vous n'êtes pas l'auteur de ce post.`);
    }

    try {
      return await this.postRepository.softDelete(id);
    } catch (error) {
      console.log(error);
      return error['detail'];
    }
  }
}
