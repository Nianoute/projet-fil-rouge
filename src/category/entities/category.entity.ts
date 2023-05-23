import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { SubCategoryEntity } from "src/sub-category/entities/sub-category.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity extends TimestampEntity {
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

    @ManyToMany(() => PostEntity, post => post.categories)
    posts: PostEntity[];

    @OneToMany(() => SubCategoryEntity, subCategory => subCategory.parent)
    children: SubCategoryEntity[];
}
