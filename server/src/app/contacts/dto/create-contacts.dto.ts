import { IsNotEmpty } from "class-validator";

export class CreateContacts{
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    office: String;

    @IsNotEmpty()
    mail: String;

    @IsNotEmpty()
    phoneNumber: String;

}