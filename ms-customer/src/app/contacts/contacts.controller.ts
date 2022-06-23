import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { CreateContacts } from "./dto/create-contacts.dto";
import { UpdateContacts } from "./dto/update-contacts.dto";

@Controller('api/v1/contacts')
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

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contactsService.findOneOfFall({ id });
    }

    @Get('findContacs/:id')
    async findListInterviews(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contactsService.findContacts(id);
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