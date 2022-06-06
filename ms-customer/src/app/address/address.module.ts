import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressEntity } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([AddressEntity])],
    providers: [AddressService],
    controllers: [AddressController],
    exports: [AddressService, TypeOrmModule]
})
export class AddressModule {}