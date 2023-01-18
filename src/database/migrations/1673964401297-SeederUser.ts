import { MigrationInterface, QueryRunner } from "typeorm"
import * as bcrypt from 'bcryptjs';

export class SeederUser1673964401297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            const hashedPassword = await bcrypt.hash('secret4', 10);
            await queryRunner.query(`INSERT INTO roles (id,name) VALUES ('2e071528-85ba-4c54-8565-34cfcc90deda','Admin');`)
            await queryRunner.query(`INSERT INTO users (id, name, password, email, role_id) VALUES ('6e25f627-1cf6-489d-8d1e-0c3efe1d4be5','Admin', '${hashedPassword}', 'admin@example.com', '2e071528-85ba-4c54-8565-34cfcc90deda');`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`DELETE FROM roles WHERE id = '2e071528-85ba-4c54-8565-34cfcc90deda' `)
            await queryRunner.query(`DELETE FROM users WHERE id = '6e25f627-1cf6-489d-8d1e-0c3efe1d4be5' `)
    }

}
