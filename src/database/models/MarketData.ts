import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntityExtended } from "../../utils";
import { Token } from "./Token";

@Entity({
    name: 'market_data',
  })
export class MarketData extends BaseEntityExtended {
  @ManyToOne(() => Token)
  @JoinColumn()
  md_token_id: Token;

  @Column({ type: 'float', nullable: false })
  md_current_price: number;
    
  @Column({ type: 'float', nullable: false })
  md_volume: number;

  @Column({ type: 'datetime', nullable: false })
  md_date_history: Date;
}
