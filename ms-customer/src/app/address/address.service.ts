import { HttpCode, HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>
    ) {}

    async findAll() {
        const addressWithUsers = await this.addressRepository
        .createQueryBuilder('address')
        .getMany();

    return addressWithUsers
    }

    async findOneOrFail(
        conditions: FindConditions<AddressEntity>,
        options?: FindOneOptions<AddressEntity>,
    ) {
        try {
            return await this.addressRepository.findOneOrFail(conditions, options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateAddressDto) {
        const profile = this.addressRepository.create(data);
        try {
            return await this.addressRepository.save(profile);
        } catch (error) {
            throw new HttpException("CNPJ already exists", 409)          
        }
      }

      async update(id: string, data: UpdateAddressDto) {
        const profile = await this.findOneOrFail({ id });
        this.addressRepository.merge(profile, data);
        return await this.addressRepository.save(profile);
      }
    
      async destroy(id: string) {
        await this.addressRepository.findOneOrFail({ id });
        this.addressRepository.softDelete({ id });
      }

}