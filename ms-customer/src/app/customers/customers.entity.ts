
import { ContactsEntity } from '../contacts/contacts.entity';
import { AddressEntity } from '../address/address.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { PhoneEntity } from '../phone/phone.entity';

@Entity()
export class CustomersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  corporateName: String;

  @Column()
  tradingName: String;

  @Column()
  birthDate: String;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  inactive: Boolean;

  @Column()
  stateRegistration: String;

  @Column()
  municipalRegistration: String;

  @Column()
  mail: String;

  @Column()
  site: String;

  @OneToOne(() => PhoneEntity, {
    orphanedRowAction: 'delete',
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  Phone: PhoneEntity;

  @OneToMany(() => ContactsEntity, contacts => contacts.Customer, { cascade: ["insert", "update", "remove"], orphanedRowAction: 'delete' })
  @JoinColumn()
  Contacts: ContactsEntity[];

  @OneToOne(() => AddressEntity, address => address.customer, { cascade: ["insert", "update", "remove"] })
  @JoinColumn()
  Address: AddressEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}


