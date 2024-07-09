import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.COMMENTS })
export class CommentEntity extends BaseModel {
  @Column('text')
  body: string;

  @Column()
  car_id: string;
  @ManyToOne(() => CarEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
