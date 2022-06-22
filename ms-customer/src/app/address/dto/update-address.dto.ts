import { IsOptional } from 'class-validator';
import { CustomersEntity } from 'src/app/customers/customers.entity';

export class UpdateAddressDto {

    @IsOptional()
    zipCode: Number;

    @IsOptional()
    street: string;

    @IsOptional()
    number: Number;

    @IsOptional()
    complement: String;

    @IsOptional()
    state: String;

    @IsOptional()
    city: String;

}