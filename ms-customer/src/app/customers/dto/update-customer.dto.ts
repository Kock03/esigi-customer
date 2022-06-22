import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { ContactsEntity } from 'src/app/contacts/contacts.entity';
import { PhoneEntity } from 'src/app/phone/phone.entity';
import { CustomersEntity } from '../customers.entity';

export class UpdateCustomerDto {
    @IsOptional()
    corporateName: string;

    @IsOptional()
    tradingName: string;

    @IsOptional()
    birthDate: Date;

    @IsOptional()
    cnpj: string;

    @IsOptional()
    inactive: Boolean;

    @IsOptional()
    stateRegistration: String;

    @IsOptional()
    municipalRegistration: String;


    @IsOptional()
    mail: String;

    @IsOptional()
    site: String;

    @IsOptional()
    @IsObject()
    Phone: PhoneEntity;

    @IsOptional()
    Address: AddressEntity;


}