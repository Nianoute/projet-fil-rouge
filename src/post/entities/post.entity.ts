import { CategoryEntity } from "src/category/entities/category.entity";
import { TimestampEntity } from "src/Generic/timestamp.entity";
import { SubCategoryEntity } from "src/sub-category/entities/sub-category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("post")
export class PostEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: false,
        unique: true,
    })
    title: string;

    @Column({
        nullable: true,
    })
    description: string;

    @Column({
        nullable: true,
    })
    priceInit: number;

    @Column({
        nullable: false,
    })
    priceNow: number;

    @Column({
        nullable: true,
    })
    place: string;

    @Column({
        nullable: false,
    })
    webSite: string;

    @Column({
        nullable: true,
    })
    promoDuration: string;



    @ManyToOne(() => UserEntity, user => user.posts)
    author: UserEntity;

    @ManyToMany(() => CategoryEntity, category => category.posts, {
        cascade: ['insert', 'update'], 
        nullable: true
    })

    @ManyToMany(() => SubCategoryEntity, subCategory => subCategory.posts, {
        cascade: ['insert', 'update'],
        nullable: true
    })
    
    @JoinTable()
    categories?: CategoryEntity[];
    subCategories?: SubCategoryEntity[];
}
