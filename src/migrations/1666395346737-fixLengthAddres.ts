import { MigrationInterface, QueryRunner } from "typeorm";

export class fixLengthAddres1666395346737 implements MigrationInterface {
    name = 'fixLengthAddres1666395346737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zipCode" character varying(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying(2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zipCode" character varying NOT NULL`);
    }

}
