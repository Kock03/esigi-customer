import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreatePhoneDto } from './dto/create-phone.dto';
  import { UpdatePhoneDto } from './dto/update-phone.dto';
  import { PhoneService } from './phone.service';
  
  @Controller('api/v1/phone')
  export class PhoneController {
    constructor(private readonly phoneService: PhoneService) { }
  
    @Get()
    async index() {
      return this.phoneService.findAll();
    }
  
    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.phoneService.findOneOrFail({ id });
    }
  
    @Post()
    async store(@Body() body: CreatePhoneDto) {
      return await this.phoneService.store(body);
    }
  
    @Put(':id')
    async update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() body: UpdatePhoneDto,
    ) {
      return await this.phoneService.update(id, body);
    }
  
    @Delete(':id')
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.phoneService.destroy(id);
    }
  }
  