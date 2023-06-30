import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>
  ) {}

  async create(data: CreateShopDto) {
    try {
        return await this.shopRepository.save(data);
    } catch (error) {
        console.log(error);
        throw new Error('Error while creating post');
    }
  }

  findAll() {
    const query = this.shopRepository
        .createQueryBuilder('shop')
        .leftJoinAndSelect('shop.postVariants', 'postVariant')
        .leftJoinAndSelect('postVariant.post', 'post')

    const shopList = query
                        .getMany();

    try {
      return shopList;
  } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
  }
  }

  findOne(id: number) {
        const query = this.shopRepository
        .createQueryBuilder('shop')
        .where('shop.id = :id', { id: id })
        .leftJoinAndSelect('shop.postVariants', 'postVariant')
        .leftJoinAndSelect('postVariant.post', 'post')

    const shop = query
                        .getOne();
                        
    try {
      return shop;
  } catch (error) {
      console.log(error);
      throw new Error('Error while getting Variant posts');
  }
  }

  async update(id: number, data: UpdateShopDto) {
    const shop = await this.shopRepository.findOneBy({ id });
    if (!shop) {
      throw new Error('Shop not found');
    }
    try {
      return await this.shopRepository.update(id, data);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error while updating post');
    }
  }

  async softDelete(id: number) {
    return await this.shopRepository.softDelete(id);  }
}
