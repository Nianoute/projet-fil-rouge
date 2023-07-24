import { TimestampEntity } from 'src/Generic/timestamp.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('like')
export class LikeEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.likesPost)
  postLikes: LikeEntity[];

  @ManyToOne(() => UserEntity, (user) => user.likesUser)
  userLikes: LikeEntity[];
}
