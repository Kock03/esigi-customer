import { CustomersEntity } from 'src/app/customers/customers.entity';
import { IsNotEmpty, IsObject } from "class-validator";
import { PhoneEntity } from 'src/app/phone/phone.entity';

export class UpdateContacts{
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    office: String;

    @IsNotEmpty()
    mail: String;


    @IsNotEmpty()
    @IsObject()
    Phone: PhoneEntity;

    @IsNotEmpty()
    Customer: CustomersEntity;

}