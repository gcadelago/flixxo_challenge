import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenTableGenerate1673977143932 implements MigrationInterface {
    name = 'TokenTableGenerate1673977143932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`market_data\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`md_current_price\` float NOT NULL, \`md_volume\` float NOT NULL, \`md_date_history\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`tkn_id\` varchar(255) NOT NULL, \`tkn_tricker\` varchar(255) NOT NULL, \`tkn_name\` varchar(255) NOT NULL, \`tkn_trade_url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP TABLE \`market_data\``);
    }

}
