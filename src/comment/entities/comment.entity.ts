import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class CommentEntity extends TimestampEntity {
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

    @ManyToOne(() => CommentEntity, comment => comment.children)
    parent: CommentEntity[];

    @OneToMany(() => CommentEntity, comment => comment.parent)
    children: CommentEntity;

    @ManyToOne(() => PostEntity, post => post.comments, {
        nullable: false,
    })
    post: PostEntity;

    @ManyToOne(() => UserEntity, user => user.comments)
    author: UserEntity[];
}
