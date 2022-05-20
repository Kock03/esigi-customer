import { IsNotEmpty } from "class-validator";
import { CustomersEntity } from "src/app/customers/customers.entity";

export class CreateContacts{
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    office: String;

    @IsNotEmpty()
    mail: String;

    @IsNotEmpty()
    phoneNumber: String;

    @IsNotEmpty()
    Customer: CustomersEntity;

}