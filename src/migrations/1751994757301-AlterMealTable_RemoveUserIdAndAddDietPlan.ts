import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMealTableRemoveUserIdAndAddDietPlan1751994757301 implements MigrationInterface {
    name = 'AlterMealTableRemoveUserIdAndAddDietPlan1751994757301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5"`);
        await queryRunner.query(`UPDATE "meal" SET "userId" = NULL`);
        await queryRunner.query(`ALTER TABLE "meal" RENAME COLUMN "userId" TO "dietPlanId"`);
        await queryRunner.query(`CREATE TABLE "diet_plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "availableAt" TIMESTAMP, "isVisible" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "professionalId" uuid, "userId" uuid, CONSTRAINT "PK_3b97909b98b133a5547b4f70a32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "diet_plan" ADD CONSTRAINT "FK_1c26ce4a0db7f9be317520cd643" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diet_plan" ADD CONSTRAINT "FK_c8a4ef41e5562c125ec9f6fcf98" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_5a0b766891d46dbf78a4f14c0d2" FOREIGN KEY ("dietPlanId") REFERENCES "diet_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_5a0b766891d46dbf78a4f14c0d2"`);
        await queryRunner.query(`ALTER TABLE "diet_plan" DROP CONSTRAINT "FK_c8a4ef41e5562c125ec9f6fcf98"`);
        await queryRunner.query(`ALTER TABLE "diet_plan" DROP CONSTRAINT "FK_1c26ce4a0db7f9be317520cd643"`);
        await queryRunner.query(`DROP TABLE "diet_plan"`);
        await queryRunner.query(`ALTER TABLE "meal" RENAME COLUMN "dietPlanId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
