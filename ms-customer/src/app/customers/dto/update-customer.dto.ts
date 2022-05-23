import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { ContactsEntity } from 'src/app/contacts/contacts.entity';
import { PhoneEntity } from 'src/app/phone/phone.entity';
import { CustomersEntity } from '../customers.entity';

export class UpdateCustomerDto {
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

    @IsOptional()
    stateRegistration: String;

    @IsOptional()
    municipalRegistration: String;


    @IsOptional()
    mail: String;

    @IsOptional()
    site: String;

    @IsNotEmpty()
    @IsObject()
    Phone: PhoneEntity;

    @IsOptional()
    Address: AddressEntity;
    

}