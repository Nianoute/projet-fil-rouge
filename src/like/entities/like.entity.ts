import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('like')
export class LikeEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
