import { TimestampEntity } from "src/Generic/timestamp.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('subCategory')
export class SubCategoryEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    description: string;

    @ManyToMany(() => PostEntity, post => post.subCategories) 
    nullable: false
    posts: PostEntity[];

    @ManyToOne(() => CategoryEntity, category => category.children)
    parent: CategoryEntity;
}
