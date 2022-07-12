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
  Query,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';
import { ICustomer } from './interface/icustomers';

@Controller('api/v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  async index() {
    return await this.customersService.findAll();
  }

  @Post()
  async store(@Body() body: CreateCustomerDto) {
    return await this.customersService.store(body);
  }

  @Get('/short/list/customers')
  async shortListCollaborators() {
    return await this.customersService.shortListCustomers();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.customersService.findOneOrFail({ id });
  }

  @Get('list/active')
  async findActive() {
    return await this.customersService.findActive();
  }

  @Get('find/corporateName')
  async find(@Query('corporateName') corporateName?: any, @Query('inactive') inactive?: any) {
    return this.customersService.find(corporateName, inactive);
  }

  @Get('list/inactive')
  async findInactive() {
    return await this.customersService.findInactive();
  }

  @Post('/list')
  async findCustomersListById(@Body() body: ICustomer) {
    return await this.customersService.findCustomerListById(body.idList);
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
