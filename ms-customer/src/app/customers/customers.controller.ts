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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';

@Controller('api/v1/customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Get()
    async index(){
        return await this.customersService.findAll();
    }

    @Post()
    async store(@Body() body: CreateCustomerDto) {
        return await this.customersService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.customersService.findOneOrFail({ id });
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateCustomerDto,
    ) {
        return await this.customersService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.customersService.destroy(id);
    }
}  
