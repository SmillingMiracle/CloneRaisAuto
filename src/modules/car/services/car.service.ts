import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarMapper } from './car.mapper';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const tags = await this.createTags(dto.tags);
    const car = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
        tags,
      }),
    );
    return CarMapper.toResponseDTO(car);
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = new Set(entities.map((tag) => tag.name));
    const newTags = tags.filter((tag) => !existingTags.has(tag));

    const newEntities = await this.tagRepository.save(
      newTags.map((name) => this.tagRepository.create({ name })),
    );
    return [...entities, ...newEntities];
  }
}
