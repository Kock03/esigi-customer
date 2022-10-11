import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CustomersEntity } from 'src/app/customers/customers.entity';

export class UpdateAddressDto {

    @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  flag: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(8)
  cep: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  number: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  street: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  district: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  complement: string;

}