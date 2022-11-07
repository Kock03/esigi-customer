import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';


export class CreatePhoneDto {
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(9)
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddd: string;

  @IsNotEmpty()

  @IsString()
  ddi: string;
}
