import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersEntity } from './customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([CustomersEntity])],
    providers: [CustomersService],
    controllers: [CustomersController],
    exports: [CustomersService, TypeOrmModule]
})
export class CustomersModule {}
