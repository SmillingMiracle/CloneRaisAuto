import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SKIP_AUTH } from '../auth/constants/constants';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarService } from './services/car.service';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized123' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.create(userData, dto);
  }
}
