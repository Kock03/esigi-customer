import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './app/address/address.module';
import { ContactsModule } from './app/contacts/contacts.module';
import { CustomersModule } from './app/customers/customers.module';
import { PhoneModule } from './app/phone/phone.module';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions), CustomersModule, ContactsModule, AddressModule, PhoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
