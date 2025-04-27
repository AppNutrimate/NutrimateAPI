import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWeightPrecision1745791061777 implements MigrationInterface {
    name = 'UpdateWeightPrecision1745791061777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weight" ALTER COLUMN "value" TYPE numeric(6,3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weight" ALTER COLUMN "value" TYPE numeric(5,3)`);
    }

}
