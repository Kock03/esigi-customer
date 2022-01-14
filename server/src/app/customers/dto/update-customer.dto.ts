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
    cnpj: string;

    @IsOptional()
    active: Boolean;

    @IsNotEmpty()
    stateRegistration: String;

    @IsNotEmpty()
    municipalRegistration: String;

    @IsNotEmpty()
    phoneNumber: String;

    @IsOptional()
    mail: String;

    @IsOptional()
    site: String;

    @IsOptional()
    Address: AddressEntity;
    
    @IsOptional()
    Contacts: ContactsEntity[];

}