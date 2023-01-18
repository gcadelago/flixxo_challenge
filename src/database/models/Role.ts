import { Column, Entity } from 'typeorm';

import { BaseEntityExtended } from '../../utils';

@Entity({
  name: 'roles',
})
export class Role extends BaseEntityExtended {
  @Column({ default: 'user', nullable: false })
  name: string;
}
