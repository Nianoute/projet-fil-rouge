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
  ){}
  
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(queries) {
    let { name } = queries;

    const query = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.children', 'children')

    if(name !== undefined && name !== "") {
      query
        .andWhere('category.name LIKE :name', { name: `%${name}%` })
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
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    const categoryUpdate = { ...category, ...updateCategoryDto };

    await this.categoryRepository.save(categoryUpdate);

    return categoryUpdate;
  }

  async softRemove(id: number) {
    return await this.categoryRepository.softDelete(id);
  }
}
