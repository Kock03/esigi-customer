import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindConditions, FindOneOptions, FindManyOptions } from "typeorm";

import { ContactsEntity } from "./contacts.entity";
import { CreateContacts } from "./dto/create-contacts.dto";
import { UpdateContacts } from "./dto/update-contacts.dto";

@Injectable()
export class ContactsService{

    constructor(
        @InjectRepository(ContactsEntity)
        private readonly contactsRepository: Repository<ContactsEntity>        
    ){ }

    async findAll(){
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
          };
          return await this.contactsRepository.find(options);
    }

    async findOneOfFall(
        conditions: FindConditions<ContactsEntity>,
        options?: FindOneOptions<ContactsEntity>
    ){
        options = { relations: ["Customer", "Phone"] }
        try{
            return await this.contactsRepository.findOneOrFail(conditions, options);
        }catch(error){
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateContacts){
        const contacts = this.contactsRepository.create(data);
        return await this. contactsRepository.save(contacts);
    }
     async update(id: string, data: UpdateContacts){
         const contact = await this.contactsRepository.findOneOrFail({id});
         this.contactsRepository.merge(contact, data);
         return await this.contactsRepository.save(contact);
    }

    async destroy(id: string){
        await this.contactsRepository.findOneOrFail({id});
        this.contactsRepository.softDelete({id});
    }

    

}