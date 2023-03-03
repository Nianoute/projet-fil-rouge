import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        unique: true,
    })
    userName: string;

    // @OneToMany(() => PostEntity, post => post.author)
    // posts: PostEntity[];
}
