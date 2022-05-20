import { IsNotEmpty } from 'class-validator';
import { CustomersEntity } from 'src/app/customers/customers.entity';

export class UpdateAddressDto{

    @IsNotEmpty()
    zipCode: Number;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    number: Number;

    @IsNotEmpty()
    complement: String;

    @IsNotEmpty()
    state: String;

    @IsNotEmpty()
    city: String;

}