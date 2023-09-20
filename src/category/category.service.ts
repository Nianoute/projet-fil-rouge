import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { uploadFileSupabase } from 'src/supabaseclient';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }

  async create(data, user, files) {
    try {
      //files
      let error = false;
      if (files) {
        if (files.length > 0) {
          const size = files[0].size;
          if (size > 1000000) {
            error = true;
          }
          const file = await uploadFileSupabase(files, 'category');

          if (file.error) {
            error = true;
          } else {
            data.imageCategory =
              'https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/category/' +
              file.data.path;
          }
        } else {
          data.imageCategory = '';
        }
      } else {
        data.imageCategory = '';
      }

      if (user.admin === false) {
        throw new NotFoundException(`You are not allowed to create a category`);
      }

      if (data.name === '' || data.name === null || data.name === undefined) {
        throw new Error('name is required');
      }


      if (error) {
        throw new Error('Le fichier est trop volumineux');
      }

      return await this.categoryRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating category');
    }
  }

  async findAll(queries) {
    let { name } = queries;

    const query = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children')

    if (name !== undefined && name !== "") {
      query
        .where('category.name LIKE :name', { name: `%${name}%` })
    }

    const categoriesList = query
      .getMany();

    try {
      return await categoriesList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching categories');
    }
  }

  async findOne(id: number) {
    const query = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children')
      .leftJoinAndSelect('category.posts', 'posts')
      .leftJoinAndSelect('posts.author', 'author')
      .leftJoinAndSelect('posts.comments', 'comments')
      .leftJoinAndSelect('posts.likesPost', 'likesPost')

    const categoriesList = query
      .getOne();

    try {
      return await categoriesList;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching categories');
    }
  }

  async update(id: number, data: UpdateCategoryDto, user) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    if (user.admin === false) {
      throw new NotFoundException(`You are not allowed to update this category`);
    }

    const categoryUpdate = { ...category, ...data };

    await this.categoryRepository.save(categoryUpdate);

    return categoryUpdate;
  }

  async softRemove(id: number, user) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    if (user.admin === false) {
      throw new NotFoundException(`You are not allowed to delete this category`);
    }

    return await this.categoryRepository.softDelete(id);
  }
}
