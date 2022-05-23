import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePhoneDto {
  @IsOptional()
  @MinLength(9)
  @MaxLength(9)
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddd: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(2)
  @IsString()
  ddi: string;
}
