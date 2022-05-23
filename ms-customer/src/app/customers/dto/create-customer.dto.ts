import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { ContactsEntity } from 'src/app/contacts/contacts.entity';
import { PhoneEntity } from 'src/app/phone/phone.entity';
import { CustomersEntity } from '../customers.entity';

export class CreateCustomerDto {
    @IsNotEmpty()
    corporateName: string;

    @IsNotEmpty()
    tradingName: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    cnpj: string;

    @IsOptional()
    active: Boolean;

    @IsNotEmpty()
    @IsObject()
    Phone: PhoneEntity;
    
    @IsOptional()
    stateRegistration: String;

    @IsOptional()
    municipalRegistration: String;

    @IsOptional()
    mail: String;
    
    @IsOptional()
    site: String;

    @IsOptional()
    Address: AddressEntity;



}