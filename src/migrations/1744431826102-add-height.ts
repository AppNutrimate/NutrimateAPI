import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddHeight1744431826102 implements MigrationInterface {
    name = 'AddHeight1744431826102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user', new TableColumn({
            name: 'height',
            type: 'integer',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "height"`);
    }

}
