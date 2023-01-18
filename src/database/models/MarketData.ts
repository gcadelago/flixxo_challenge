import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntityExtended } from "../../utils";
import { Token } from "./Token";

@Entity({
    name: 'market_data',
  })
export class MarketData extends BaseEntityExtended {
  @ManyToOne(() => Token, (tkn) => tkn.tkn_md)
  @JoinColumn({name: 'md_token_id', referencedColumnName: 'tkn_id'})
  md_token_id: Token;

  @Column({ type: 'float', nullable: false })
  md_current_price: number;
    
  @Column({ type: 'float', nullable: false })
  md_volume: number;

  @Column({ type: 'datetime', nullable: false })
  md_date_history: Date;
}
