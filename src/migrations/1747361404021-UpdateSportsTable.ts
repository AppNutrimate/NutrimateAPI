import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSportsTable1747361404021 implements MigrationInterface {
    name = 'UpdateSportsTable1747361404021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport" ADD "met" integer NOT NULL DEFAULT 1`);

        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Football'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 8 WHERE "title" = 'Basketball'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 4 WHERE "title" = 'Volleyball'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Tennis'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 10 WHERE "title" = 'Running'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 8 WHERE "title" = 'Swimming'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 9 WHERE "title" = 'Boxing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Cycling'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 3 WHERE "title" = 'Golf'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 10 WHERE "title" = 'Judo'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Baseball'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 8 WHERE "title" = 'Rugby'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 4 WHERE "title" = 'Cricket'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Hockey'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Skateboarding'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 8 WHERE "title" = 'Climbing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Surfing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Fencing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 4 WHERE "title" = 'Weightlifting'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 10 WHERE "title" = 'Jiu-Jitsu'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 4 WHERE "title" = 'Table Tennis'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Beach Tennis'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Roller Skating'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 2 WHERE "title" = 'Stretching'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Gym'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 3 WHERE "title" = 'Yoga'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 3 WHERE "title" = 'Pilates'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Free Workout'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Dance'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 10 WHERE "title" = 'Mixed Martial Arts'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 8 WHERE "title" = 'Crossfit'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 3 WHERE "title" = 'Walking'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Trekking'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Rowing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Canoeing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 4 WHERE "title" = 'Horse Riding'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Ice Skating'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Snowboarding'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Skiing'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 3 WHERE "title" = 'Archery'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Scuba Diving'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 9 WHERE "title" = 'Parkour'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 6 WHERE "title" = 'Aerobics'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 8 WHERE "title" = 'HIIT'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 1 WHERE "title" = 'Meditation'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 9 WHERE "title" = 'Handball'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 5 WHERE "title" = 'Badminton'`);
        await queryRunner.query(`UPDATE "sport" SET "met" = 7 WHERE "title" = 'Zumba'`);

        await queryRunner.query(`ALTER TABLE "sport" ALTER COLUMN "met" DROP DEFAULT`);

        await queryRunner.query(`ALTER TABLE "sport" ADD CONSTRAINT "UQ_dd8d2ccda1c6a0959094235a9a5" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport" DROP CONSTRAINT "UQ_dd8d2ccda1c6a0959094235a9a5"`);
        await queryRunner.query(`ALTER TABLE "sport" DROP COLUMN "met"`);
    }
}
