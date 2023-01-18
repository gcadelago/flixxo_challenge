import { MigrationInterface, QueryRunner } from "typeorm"

export class SeederMarketData1674048202724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tokens (id,tkn_id,tkn_tricker,tkn_name,tkn_trade_url) VALUES ('1','probit_token','prob','ProBit Token','https://www.probit.com/app/exchange/PROB-USDT');`)
        await queryRunner.query(`INSERT INTO tokens (id,tkn_id,tkn_tricker,tkn_name,tkn_trade_url) VALUES ('2','bitcoin','btc','Bitcoin','https://www.probit.com/app/exchange/BTC-USDT');`)
        await queryRunner.query(`INSERT INTO tokens (id,tkn_id,tkn_tricker,tkn_name,tkn_trade_url) VALUES ('3','edge_token','edgt','Edge Token','https://www.probit.com/app/exchange/EDGT-USDT');`)
        await queryRunner.query(`INSERT INTO tokens (id,tkn_id,tkn_tricker,tkn_name,tkn_trade_url) VALUES ('4','tomato_coin','bptc','Tomato Coin','https://www.probit.com/app/exchange/BPTC-USDT');`)
        await queryRunner.query(`INSERT INTO tokens (id,tkn_id,tkn_tricker,tkn_name,tkn_trade_url) VALUES ('5','ethereum','eth','Ethereum','https://www.probit.com/app/exchange/ETH-USDT');`)
        await queryRunner.query(`INSERT INTO market_data (id,md_token_id,md_current_price,md_volume,md_date_history) VALUES ('1','ethereum','1580.20','15040726','2023-01-18T10:00:00');`)
        await queryRunner.query(`INSERT INTO market_data (id,md_token_id,md_current_price,md_volume,md_date_history) VALUES ('2','bitcoin','21256.6','23075355.63','2023-01-18T10:00:00');`)
        await queryRunner.query(`INSERT INTO market_data (id,md_token_id,md_current_price,md_volume,md_date_history) VALUES ('3','edge_token','1.001','202234000','2023-01-18T10:00:00');`)
        await queryRunner.query(`INSERT INTO market_data (id,md_token_id,md_current_price,md_volume,md_date_history) VALUES ('4','tomato_coin','0.055','16478398.30','2023-01-18T10:00:00');`)
        await queryRunner.query(`INSERT INTO market_data (id,md_token_id,md_current_price,md_volume,md_date_history) VALUES ('5','probit_token','0.132','3809.30','2023-01-18T10:00:00');`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM tokens WHERE id = '1' or id = '2' or id = '3' or id = '4' or id = '5' `)
        await queryRunner.query(`DELETE FROM market_data WHERE id = '1' or id = '2' or id = '3' or id = '4' or id = '5' `)
    }

}
