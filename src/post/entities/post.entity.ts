import { CategoryEntity } from "src/category/entities/category.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostVariantEntity } from "src/post-variant/entities/post-variant.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    promoDuration: string;

    @ManyToOne(() => UserEntity, user => user.posts)
    author: UserEntity;

    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[];

    @OneToMany(() => PostVariantEntity, postVariants => postVariants.post, {
        cascade: ['insert', 'update'],
        nullable: false,
        })
    postVariants: PostVariantEntity;

    @ManyToMany(() => UserEntity, user => user.postLiked, {
        cascade: ['insert', 'update'],
        nullable: true
    })
    @JoinTable()
    likedBy?: UserEntity[];

    @ManyToMany(() => CategoryEntity, category => category.posts, {
        cascade: ['insert', 'update'], 
        nullable: true
    })
    @JoinTable()    
    categories?: CategoryEntity[];
}