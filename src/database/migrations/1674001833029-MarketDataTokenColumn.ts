import { MigrationInterface, QueryRunner } from "typeorm";

export class MarketDataTokenColumn1674001833029 implements MigrationInterface {
    name = 'MarketDataTokenColumn1674001833029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`market_data\` ADD \`mdTokenIdId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD UNIQUE INDEX \`IDX_04ffa1bec83632293f54680011\` (\`tkn_id\`)`);
        await queryRunner.query(`ALTER TABLE \`market_data\` ADD CONSTRAINT \`FK_29b47be04521b3c3e8b7f26cb7b\` FOREIGN KEY (\`mdTokenIdId\`) REFERENCES \`tokens\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`market_data\` DROP FOREIGN KEY \`FK_29b47be04521b3c3e8b7f26cb7b\``);
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP INDEX \`IDX_04ffa1bec83632293f54680011\``);
        await queryRunner.query(`ALTER TABLE \`market_data\` DROP COLUMN \`mdTokenIdId\``);
    }

}
