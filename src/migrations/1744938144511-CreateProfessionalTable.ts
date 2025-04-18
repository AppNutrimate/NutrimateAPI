import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfessionalTable1744938144511 implements MigrationInterface {
    name = 'CreateProfessionalTable1744938144511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professional" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(120) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "birth" character varying NOT NULL, "registration" character varying, "cpf" character varying NOT NULL, "area" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bd2d883e618593ec11bcd75d5ed" UNIQUE ("email"), CONSTRAINT "UQ_094eda9ca085d134162e328d4a0" UNIQUE ("cpf"), CONSTRAINT "PK_2846b0dcaac01f9983cb719f124" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "professional"`);
    }

}
