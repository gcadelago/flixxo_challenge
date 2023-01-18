import { Column, Entity, OneToMany } from "typeorm"

import { BaseEntityExtended } from '../../utils';
import { MarketData } from "./MarketData";

@Entity({
    name: 'tokens',
  })
export class Token extends BaseEntityExtended {
  @Column({ nullable: false, unique: true })
  tkn_id: string;

  @Column({ nullable: false })
  tkn_tricker: string;

  @Column({ nullable: false })
  tkn_name: string;
  
  @Column({ nullable: true })
  tkn_trade_url: string;
  
  @OneToMany(() => MarketData, (md) => md.md_token_id)
  tkn_md: MarketData[];
}
