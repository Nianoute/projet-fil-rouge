import { CategoryEntity } from "src/category/entities/category.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    priceInit: number;

    @Column({
        nullable: false,
    })
    priceNow: number;

    @Column({
        nullable: true,
    })
    shop: string;

    @Column({
        nullable: false,
    })
    webSite: string;

    @ManyToOne(() => PostEntity, post => post.postVariants)
    post: PostEntity[];

    @ManyToMany(() => CategoryEntity, category => category.posts, {
        cascade: ['insert', 'update'], 
        nullable: true
    })
    @JoinTable()    
    categories?: CategoryEntity[];
}
