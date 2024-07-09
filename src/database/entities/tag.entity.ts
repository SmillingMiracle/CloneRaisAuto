import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.TAGS })
export class TagEntity extends BaseModel {
  @Column('text')
  name: string;

  @ManyToMany(() => CarEntity, (entity) => entity.tags)
  @JoinTable()
  cars?: CarEntity[];
}
