import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToUser1716570447632 implements MigrationInterface {
    name = 'AddIsActiveToUser1716570447632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }
}
