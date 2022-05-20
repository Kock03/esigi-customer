import {
  HttpCode,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersEntity } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { DocumentValidator } from '../validators/document.validator';
import { DocumentsBadRequestExcpetion } from '../exceptions/documents-bad-request.exception';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersEntity)
    private readonly customersRepository: Repository<CustomersEntity>,
  ) {}

  async findAll() {
    const customersWithUsers = await this.customersRepository
      .createQueryBuilder('customers')
      .getMany();

    return customersWithUsers;
  }

  async findOneOrFail(
    conditions: FindConditions<CustomersEntity>,
    options?: FindOneOptions<CustomersEntity>,
  ) {
    options = { relations: ['Address', 'Contacts'] };
    try {
      return await this.customersRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateCustomerDto) {
    const profile = this.customersRepository.create(data);

    if (data.cnpj === '') {
      throw new DocumentsBadRequestExcpetion();
    }

    if (data.cnpj) {
      const invalidCnpj = DocumentValidator.isValidCnpj(data.cnpj);
      if (invalidCnpj) {
        throw new DocumentsBadRequestExcpetion();
      }
    }

    try {
      return await this.customersRepository.save(profile);
    } catch (error) {
      throw new HttpException(error.sqlMessage, 409);
    }
  }

  async update(id: string, data: UpdateCustomerDto) {
    const profile = await this.findOneOrFail({ id });
    this.customersRepository.merge(profile, data);
    return await this.customersRepository.save(profile);
  }

  async destroy(id: string) {
    await this.customersRepository.findOneOrFail({ id });
    this.customersRepository.softDelete({ id });
  }
}
