
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { CustomersEntity } from '../customers/customers.entity';
import { PhoneEntity } from '../phone/phone.entity';

@Entity({ name: 'contacts' })
export class ContactsEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: String;

  @Column()
  office: String;

  @OneToOne(() => PhoneEntity, {
    orphanedRowAction: 'delete',
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  Phone: PhoneEntity;


  @Column()
  mail: String;

  @ManyToOne(() => CustomersEntity, customers => customers.Contacts, { orphanedRowAction: 'delete' })
  Customer: CustomersEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}