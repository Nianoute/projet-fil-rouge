import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}
