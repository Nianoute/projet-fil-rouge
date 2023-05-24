import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        unique: true,
        nullable: false

    })
    email: string;

    @Column({
        unique: true,
        nullable: false

    })
    userName: string;

    @Column({
        nullable: true,
    })
    admin: boolean;

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, comment => comment.author)
    comments: CommentEntity[];
}
