import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('recipe')
export class RecipeEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}
