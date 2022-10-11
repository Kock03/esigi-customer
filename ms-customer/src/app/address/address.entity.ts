
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { CustomersEntity } from '../customers/customers.entity';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  flag: string;

  @Column()
  cep: string;

  @Column()
  number: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  complement: string;

  @OneToOne(() => CustomersEntity, customers => customers.Address) // specify inverse side as a second parameter
  customer: CustomersEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

}