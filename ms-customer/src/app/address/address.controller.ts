import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressService } from './address.service';

@Controller('api/v1/address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Get()
    async index() {
        return await this.addressService.findAll();
    }

    @Post()
    async store(@Body() body: CreateAddressDto) {
        return await this.addressService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.addressService.findOneOrFail({ id });
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateAddressDto,
    ) {
        return await this.addressService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.addressService.destroy(id);
    }
}  
