import { CustomersEntity } from 'src/app/customers/customers.entity';
import { IsOptional, IsObject } from "class-validator";
import { PhoneEntity } from 'src/app/phone/phone.entity';

export class UpdateContacts {

    @IsOptional()
    name: string;

    @IsOptional()
    office: String;

    @IsOptional()
    mail: String;


    @IsOptional()
    @IsObject()
    Phone: PhoneEntity;

    @IsOptional()
    Customer: CustomersEntity;

}