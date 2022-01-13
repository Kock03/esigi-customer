import { IsNotEmpty } from 'class-validator';
import { CustomersEntity } from '../customers.entity';

export class UpdateCustomerDto {
    @IsNotEmpty()
    corporateName: string;

    @IsNotEmpty()
    tradingName: string;

    @IsNotEmpty()
    cnpj: string;

    @IsNotEmpty()
    active: Boolean;

    @IsNotEmpty()
    stateRegistration: String;

    @IsNotEmpty()
    municipalRegistration: String;

    @IsNotEmpty()
    phoneNumber: Number;

    @IsNotEmpty()
    mail: String;

    @IsNotEmpty()
    site: String;

}