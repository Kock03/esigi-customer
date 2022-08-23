import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindConditions, FindOneOptions, FindManyOptions } from "typeorm";

import { ContactsEntity } from "./contacts.entity";
import { CreateContacts } from "./dto/create-contacts.dto";
import { UpdateContacts } from "./dto/update-contacts.dto";

@Injectable()
export class ContactsService {

    constructor(
        @InjectRepository(ContactsEntity)
        private readonly contactsRepository: Repository<ContactsEntity>
    ) { }

    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.contactsRepository.find(options);
    }

    async findOneOfFall(
        conditions: FindConditions<ContactsEntity>,
        options?: FindOneOptions<ContactsEntity>
    ) {
        options = { relations: ["Customer", "Phone"] }
        try {
            return await this.contactsRepository.findOneOrFail(conditions, options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findContacts(id: string) {

        return await this.contactsRepository.query(
            'select contacts_entity.id, contacts_entity.name, contacts_entity.office, contacts_entity.mail,contacts_entity.customer_id, p.phone_number, p.ddd, p.ddi from contacts_entity left join phone_entity p on  p.id=contacts_entity.phone_id where contacts_entity.customer_id = ' + '"' + id + '"' + ' and contacts_entity.deleted_at is null ',
        )
    }

    async store(data: CreateContacts) {
        const contacts = this.contactsRepository.create(data);
        return await this.contactsRepository.save(contacts);
    }
    async update(id: string, data: UpdateContacts) {
        const contact = await this.contactsRepository.findOneOrFail({ id });
        this.contactsRepository.merge(contact, data);
        return await this.contactsRepository.save(contact);
    }

    async destroy(id: string) {
        await this.contactsRepository.findOneOrFail({ id });
        this.contactsRepository.softDelete({ id });
    }
}