import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactsEntity } from '../contacts/contacts.entity';
import { CustomersEntity } from '../customers/customers.entity';

@Entity()
export class PhoneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'phone_number', length: 9 })
  phoneNumber: string;

  @Column({ name: 'ddd', length: 2 })
  ddd: string;

  @Column({ name: 'ddi', length: 3 })
  ddi: string;

  @OneToOne(() => CustomersEntity, (customer) => customer.Phone)
  Customer: CustomersEntity;

  @OneToOne(() => ContactsEntity, (contact) => contact.Phone)
  Contact: ContactsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
