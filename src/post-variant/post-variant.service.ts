import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostVariantDto } from './dto/create-post-variant.dto';
import { UpdatePostVariantDto } from './dto/update-post-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostVariantEntity } from './entities/post-variant.entity';
import { Repository } from 'typeorm';
import { uploadFileSupabase } from 'src/supabaseclient';

@Injectable()
export class PostVariantService {
  constructor(
    @InjectRepository(PostVariantEntity)
    private readonly postVariantRepository: Repository<PostVariantEntity>
  ) { }
  async create(data, files: any) {
    try {
      let error = false
      if (files) {
        if (files.length > 0) {
          const size = files[0].size;
          if (size > 1000000) {
            error = true;
          }
          const file = await uploadFileSupabase(files, 'postVariants')
          if (file.error) {
            error = true;
          } else {
            data.imagePostV = "https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/postVariants/" + file.data.path;
          }
          console.log(file);
        } else {
          data.imagePostV = "";
        }
      } else {
        data.imagePostV = "";
      }

      return await this.postVariantRepository.save(data);

    } catch (error) {
      console.log(error);
      throw new Error('Error while creating post');
    }
  }

  async findAll() {
    const query = this.postVariantRepository
      .createQueryBuilder('postVariant')
      .leftJoinAndSelect('postVariant.post', 'post')
      .leftJoinAndSelect('postVariant.shop', 'shop')



    const postVariantList = query
      .getMany();

    try {
      return postVariantList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
    }
  }

  findAllByPostId(postId: number) {
    const query = this.postVariantRepository
      .createQueryBuilder('postVariant')
      .where('postVariant.post.id = :postId', { postId: postId })
      .leftJoinAndSelect('postVariant.post', 'post')
      .leftJoinAndSelect('postVariant.shop', 'shop')

    const postVariantList = query
      .getMany();
    try {
      return postVariantList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
    }
  }

  findOne(id: number) {
    const query = this.postVariantRepository
      .createQueryBuilder('postVariant')
      .where('postVariant.id = :id', { id: id })
      .leftJoinAndSelect('postVariant.post', 'post')
      .leftJoinAndSelect('postVariant.shop', 'shop')



    const postVariant = query
      .getOne();

    try {
      return postVariant;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
    }
  }

  async update(id: number, data: UpdatePostVariantDto, file) {
    const query = this.postVariantRepository
      .createQueryBuilder('postVariant')
      .where('postVariant.id = :id', { id: id })


    const postVariant = query
      .getOne();

    if (!postVariant) {
      throw new NotFoundException('Post variant not found');
    }

    try {
      if (file) {
        if (file.length > 0) {
          const size = file[0].size;
          if (size > 1000000) {
            throw new Error('File too big');
          }
          const fileUploaded = await uploadFileSupabase(file, 'postVariants')
          if (fileUploaded.error) {
            throw new Error('Error while uploading file');
          } else {
            data.imagePostV = "https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/postVariants/" + fileUploaded.data.path;
          }
        } else {
          data.imagePostV = "";
        }
      } else {
        data.imagePostV = "";
      }
      return await this.postVariantRepository.update(id, data);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error while updating post variant');
    }

  }

  async softDelete(id: number) {
    return await this.postVariantRepository.softDelete(id);
  }
}
