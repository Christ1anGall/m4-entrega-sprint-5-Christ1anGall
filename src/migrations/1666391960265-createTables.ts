import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1666391960265 implements MigrationInterface {
    name = 'createTables1666391960265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL, "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" uuid NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "useridId" uuid, "propertyidId" uuid, CONSTRAINT "PK_751450246dee9abc82a47dabc4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL, "size" integer NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, "addressidId" uuid, "categoryidId" uuid, CONSTRAINT "REL_ded474bae00e4f1e7a1b907f10" UNIQUE ("addressidId"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_56496f79df4ee7ac6d676d97fb2" FOREIGN KEY ("useridId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_60b25c88ee11901039c172526fb" FOREIGN KEY ("propertyidId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_ded474bae00e4f1e7a1b907f10d" FOREIGN KEY ("addressidId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_25744ae6bfcd3d8f32110dccae9" FOREIGN KEY ("categoryidId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_25744ae6bfcd3d8f32110dccae9"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_ded474bae00e4f1e7a1b907f10d"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_60b25c88ee11901039c172526fb"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_56496f79df4ee7ac6d676d97fb2"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
