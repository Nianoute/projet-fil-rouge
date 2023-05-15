import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { get } from 'http';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
) {}

  async create(data) {
    try {
        let error = false
        if (data.place){
          data.webSite = "";
        } else {
          const https = data.webSite.substring(0, 8);
          if (https != "https://"){
            error = true;
            const errorMessage = "Le website doit etre un site sécurisé !!!!!!";  
            return errorMessage;
          }
        }

        if (data.priceInit) {
          if(data.priceInit <= data.priceNow){
            data.priceNow = null
            error = true;
            const errorMessage = "Le prix initial doit etre supérieur au prix de maintenant, sinon ce n'est pas un bon plan";  
            return errorMessage;
          }
        }

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

    const query = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.categories', 'categories')
        .leftJoinAndSelect('post.author', 'author')


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
    try {
      const post = await this.postRepository.findOneBy({ id });
      const postUpdate = { ...post, ...data };
      await this.postRepository.save(postUpdate);
  
      return postUpdate;    
    } catch (error) {
      
    }
  }

  async softDelete(id: number) {
    return await this.postRepository.softDelete(id);
  }
}
