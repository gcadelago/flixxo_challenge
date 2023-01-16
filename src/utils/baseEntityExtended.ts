import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Base abstract entity for all entities, used in ActiveRecord patterns.
 *
 * This extended class is the typeorm BaseEntity plus default entity columns: `id`, `created_at`, `updated_at` and `deleted_at`
 */
export class BaseEntityExtended extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
