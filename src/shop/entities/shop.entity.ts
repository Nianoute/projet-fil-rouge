import { TimestampEntity } from "src/Generic/timestamp.entity";
import { PostVariantEntity } from "src/post-variant/entities/post-variant.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("shop")
export class ShopEntity extends TimestampEntity {
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
        nullable: false,
    })
    adresse: string;

    @OneToMany(() => PostVariantEntity, postVariant => postVariant.shop)
    postVariants: PostVariantEntity[];
}
