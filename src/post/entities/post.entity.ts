import { CategoryEntity } from "src/category/entities/category.entity";
import { TimestampEntity } from "src/Generic/timestamp.entity";
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

    @ManyToOne(() => UserEntity, user => user.posts)
    author: UserEntity;

    @ManyToMany(() => CategoryEntity, category => category.posts, {
        cascade: ['insert'],
    })
    @JoinTable()
    categories: CategoryEntity[];
}
