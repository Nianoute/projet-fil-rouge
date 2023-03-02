import { TimestampEntity } from "src/Generic/timestamp.entity";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('box')
export class BoxEntity extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

}
