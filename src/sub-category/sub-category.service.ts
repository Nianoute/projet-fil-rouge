import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entities/sub-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>
  ){}

  async create(data: CreateSubCategoryDto) {
    return await this.subCategoryRepository.save(data);
  }

  async findAll() {

    const query = await this.subCategoryRepository
        .createQueryBuilder('subCategory')
        .leftJoinAndSelect('subCategory.parent', 'parent')

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
    return await this.subCategoryRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateSubCategoryDto) {
    const subCategory = await this.findOne(id);

    if (!subCategory) {
      throw new NotFoundException(`SubCategory #${id} not found`);
    }

    const subCategoryUpdate = { ...subCategory, ...data };

    await this.subCategoryRepository.save(subCategoryUpdate);

    return subCategoryUpdate;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategory`;
  }
}
