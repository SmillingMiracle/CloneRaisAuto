import { CarEntity } from '../../../database/entities/car.entity';
import { CarResDto } from '../dto/res/car.res.dto';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      body: entity.body,
      created: entity.created,
      updated: entity.updated,
      tags: entity.tags.map((tag) => tag.name),
    };
  }
}
