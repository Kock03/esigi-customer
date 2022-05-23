import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { ContactsEntity } from 'src/app/contacts/contacts.entity';
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

    @IsNotEmpty()
    phoneNumber: String;

    @IsOptional()
    mail: String;

    @IsOptional()
    site: String;

    @IsOptional()
    Address: AddressEntity;
    

}