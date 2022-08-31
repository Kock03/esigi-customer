import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneEntity } from './phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.phoneRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<PhoneEntity>,
    options?: FindOneOptions<PhoneEntity>,
  ) {
    try {
      return await this.phoneRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async store(createDto: CreatePhoneDto) {
    const phone = this.phoneRepository.create(createDto);
    return await this.phoneRepository.save(phone);
  }

  async update(id: string, data: UpdatePhoneDto) {
    try {
      const phone = await this.phoneRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.phoneRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.phoneRepository.findOne({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.phoneRepository.softDelete({ id });
  }
}
