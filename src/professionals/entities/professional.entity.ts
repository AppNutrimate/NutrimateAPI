import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as argon2 from "argon2";


@Entity()
export class Professional {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 50 })
    firstName: string;

    @Column({ nullable: false, length: 120 })
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    birth: string;

    @Column({ nullable: true })
    registration: string;

    @Column({ nullable: false, unique: true })
    cpf: string;

    @Column({ nullable: true })
    area: string;

    @Column({ nullable: false, default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    constructor(partial: Partial<Professional>) {
        Object.assign(this, partial);
    }
}