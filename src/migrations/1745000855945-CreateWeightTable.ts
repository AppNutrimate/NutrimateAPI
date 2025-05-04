import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWeightTable1745000855945 implements MigrationInterface {
    name = 'CreateWeightTable1745000855945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weight" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(5,3) NOT NULL, "measuredAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_d62a2bdd27e5c173f24c4c73a41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weight" ADD CONSTRAINT "FK_ee9312aff6c9fd36e604ed57f50" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weight" DROP CONSTRAINT "FK_ee9312aff6c9fd36e604ed57f50"`);
        await queryRunner.query(`DROP TABLE "weight"`);
    }

}
