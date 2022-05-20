
import { ContactsEntity } from '../contacts/contacts.entity';
import { AddressEntity } from '../address/address.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  corporateName: String;

  @Column()
  tradingName: String;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  active: Boolean;

  @Column()
  stateRegistration: String;

  @Column()
  municipalRegistration: String;

  @Column()
  phoneNumber: String;

  @Column()
  mail: String;

  @Column()
  site: String;

  @OneToMany(() => ContactsEntity, contacts => contacts.Customer, {cascade: ["insert", "update", "remove"], orphanedRowAction: 'delete'})
  @JoinColumn()
  Contacts: ContactsEntity[];

  @OneToOne(() => AddressEntity, address => address.customer, {cascade: ["insert", "update", "remove"]})
  @JoinColumn()
  Address: AddressEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}


