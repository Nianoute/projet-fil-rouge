import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    description: string;

    @ManyToMany(() => PostEntity, post => post.categories)
    posts: PostEntity[];

    @ManyToOne(() => CategoryEntity, category => category.children)
    parent: CategoryEntity[];

    @OneToMany(() => CategoryEntity, category => category.parent)
    children: CategoryEntity;
}
