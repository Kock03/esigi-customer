import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Public } from "src/decorators/public.decorator";
import { ContactsService } from "./contacts.service";
import { CreateContacts } from "./dto/create-contacts.dto";
import { UpdateContacts } from "./dto/update-contacts.dto";

@Controller('customer/api/v1/contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @Get()
    async index() {
        return await this.contactsService.findAll();
    }

    @Post()
    async store(@Body() body: CreateContacts) {
        return await this.contactsService.store(body);

    }

    @Public()
    @Post('find')
    async find(@Body() body: any) {
        return await this.contactsService.findByCustomer(body.id, body.name)
    }


    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contactsService.findOneOfFall({ id });
    }

    @Get('findContacts/:id')
    async findListInterviews(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contactsService.findContacts(id);
    }

    @Post('/list')
    async findCustomersListById(@Body() body: any) {
        return await this.contactsService.findContactsListById(body.idList);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateContacts
    ) {
        return await this.contactsService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.contactsService.destroy(id);
    }
}