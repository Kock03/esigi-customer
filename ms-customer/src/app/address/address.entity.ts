
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CustomersEntity } from '../customers/customers.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zipCode: Number;

  @Column()
  street: string;

  @Column()
  number: Number;

  @Column()
  complement: String;

  @Column()
  state: String;

  @Column()
  city: String;

  @OneToOne(() => CustomersEntity, customers => customers.Address) // specify inverse side as a second parameter
  customer: CustomersEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

}