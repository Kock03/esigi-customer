import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomersEntity } from '../customers/customers.entity';

@Entity({name: 'contacts'})
export class ContactsEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: String;

    @Column()
    office: String;

    @Column()
    mail: String;

    @Column({length: 12})
    phoneNumber: String;

    @ManyToOne(() => CustomersEntity, customers => customers.Contacts, {orphanedRowAction: 'delete'})
    customers: CustomersEntity;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
     updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;
}