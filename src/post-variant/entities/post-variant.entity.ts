import { CategoryEntity } from "src/category/entities/category.entity";
import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { ShopEntity } from "src/shop/entities/shop.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("postVariant")
export class PostVariantEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: true,
    })
    description: string;

    @Column({
        nullable: true,
    })
    price: number;

    @Column({
        nullable: true,
    })
    promoPrice: number;

    @Column({
        nullable: true,
    })
    imagePostV: string;

    @ManyToOne(() => PostEntity, post => post.postVariants)
    post: PostEntity[];

    @ManyToOne(() => ShopEntity, shop => shop.postVariants, {
        cascade: ['insert', 'update']
    })
    shop: ShopEntity[];

    @ManyToMany(() => CategoryEntity, category => category.posts, {
        cascade: ['insert', 'update'], 
        nullable: true
    })
    @JoinTable()    
    categories?: CategoryEntity[];

}
