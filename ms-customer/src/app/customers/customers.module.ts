import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersEntity } from './customers.entity';


@Module({
    imports: [TypeOrmModule.forFeature([CustomersEntity])],
    providers: [CustomersService],
    controllers: [CustomersController],
    exports: [CustomersService, TypeOrmModule]
})
export class CustomersModule {}
