import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1666481149195 implements MigrationInterface {
    name = 'createTables1666481149195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_56496f79df4ee7ac6d676d97fb2"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "useridId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_6b07764ec82685efb66e5629845" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_6b07764ec82685efb66e5629845"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "userId" TO "useridId"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_56496f79df4ee7ac6d676d97fb2" FOREIGN KEY ("useridId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
