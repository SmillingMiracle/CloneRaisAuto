import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { BaseModel } from './models/base.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.ARTICLES })
export class CarEntity extends BaseModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @OneToMany(() => LikeEntity, (entity) => entity.car)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.car)
  comments?: CommentEntity[];

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.cars)
  tags?: TagEntity[];
}
