import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @ManyToMany(() => PostEntity, post => post.categories)
    posts: PostEntity[];
}
