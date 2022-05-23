import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneController } from './phone.controller';
import { PhoneEntity } from './phone.entity';
import { PhoneService } from './phone.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
