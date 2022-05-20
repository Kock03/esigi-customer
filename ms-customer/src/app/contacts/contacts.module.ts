import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactsController } from './contacts.controller';
import { ContactsEntity } from "./contacts.entity";
import { ContactsService } from './contacts.service';

@Module({
    imports: [TypeOrmModule.forFeature([ContactsEntity])],
    controllers: [ContactsController],
    providers: [ContactsService],
  })

export class ContactsModule{}