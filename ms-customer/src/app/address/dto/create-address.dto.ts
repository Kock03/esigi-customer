import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength,} from 'class-validator';
import { CustomersEntity } from 'src/app/customers/customers.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    flag: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    cep: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    number: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    street: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    district: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    state: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    city: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(3)
    complement: string;

}