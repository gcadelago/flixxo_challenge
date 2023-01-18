import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityExtended } from '../../utils';
import { Role } from './Role';

@Entity({
  name: 'users',
})
export class User extends BaseEntityExtended {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;
  
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
