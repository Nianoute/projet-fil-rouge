import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }

  async create(data: CreateCategoryDto, user) {
    if (user.admin === false) {
      throw new NotFoundException(`You are not allowed to create a category`);
    }

    return await this.categoryRepository.save(data);
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

    const categoriesList = query
      .getMany();

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
