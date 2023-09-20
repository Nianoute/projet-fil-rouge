import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likeCategory')
export class LikeCategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.likesCategory)
  categoryLikes: LikeCategoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.likesCategoryUser)
  userCategoryLikes: LikeCategoryEntity[];
}
