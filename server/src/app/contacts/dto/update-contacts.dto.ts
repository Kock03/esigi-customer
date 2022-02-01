import { IsNotEmpty } from "class-validator";

export class UpdateContacts{
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    office: String;

    @IsNotEmpty()
    mail: String;

    @IsNotEmpty()
    phoneNumber: String;

}