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
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
  In,
  Like,
} from 'typeorm';
import { DocumentValidator } from '../validators/document.validator';
import { DocumentsBadRequestExcpetion } from '../exceptions/documents-bad-request.exception';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersEntity)
    private readonly customersRepository: Repository<CustomersEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
      relations: ['Address', 'Contacts', 'Phone'],
    };
    return await this.customersRepository.find(options);
  }

  async findCustomerListById(idList: string[]) {
    return await this.customersRepository.find({
      select: ['id', 'corporateName'],
      where: { id: In(idList) },
    });
  }

  async findInactive() {
    return await this.customersRepository
      .createQueryBuilder('customers')
      .leftJoinAndSelect('customers.Phone', 'Phone')
      .where('customers.inactive =true')
      .getMany();
  }

  async shortListCustomers() {
    return await this.customersRepository.find({
      select: ['id', 'corporateName'],
      where: { inactive: false },
      relations: ['Contacts']

    });



    // return from(this.usersRepository.findOne({
    //   where: { id },
    //   relations: {
    //     Client: true,
    //     Doctor: true,
    //     DetailsProfile: true

    //   },
    // }));
  }

  async findActive() {
    return await this.customersRepository
      .createQueryBuilder('customers')
      .leftJoinAndSelect('customers.Phone', 'Phone')
      .where('customers.inactive =false')
      .getMany();
  }

  findByName(query: any): Promise<CustomersEntity[]> {
    return this.customersRepository.find({
      select: ['id', 'corporateName'],
      where: [{ corporateName: Like(`%${query.corporateName}%`) }],
    });
  }

  async find(corporateName: string, status: number) {
    let customer;
    if (corporateName === '') {
      switch (status) {
        case 1:
          customer = this.findAll();
          return customer;
          break;
        case 2:
          customer = this.findActive();
          return customer;
          break;
        case 3:
          customer = this.findInactive();
          return customer;
          break;
      }
    } else {
      switch (status) {
        case 1:
          customer = await this.customersRepository.find({
            select: ['id', 'corporateName', 'birthDate'],
            relations: ['Phone', 'Contacts'],
            where: [
              {
                corporateName: Like(`%${corporateName}%`),
              },
            ],
          });

          return customer;

          break;
        case 2:
          customer = await this.customersRepository.find({
            select: ['id', 'corporateName', 'birthDate'],
            relations: ['Phone', 'Contacts'],
            where: [
              { corporateName: Like(`%${corporateName}%`), inactive: false },
            ],
          });
          return customer;
          break;
        case 3:
          customer = await this.customersRepository.find({
            select: ['id', 'corporateName', 'birthDate'],
            relations: ['Phone', 'Contacts'],
            where: [
              { corporateName: Like(`%${corporateName}%`), inactive: true },
            ],
          });
          return customer;
          break;
      }
    }
  }

  async findOneOrFail(
    conditions: FindConditions<CustomersEntity>,
    options?: FindOneOptions<CustomersEntity>,
  ) {
    options = { relations: ['Address', 'Phone'] };
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
