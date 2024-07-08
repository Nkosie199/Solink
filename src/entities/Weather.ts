import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
} from 'typeorm';

@Entity()
export class Weather extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

    @Column()
    air_temp: number;

    @Column()
    dni: number;

    @Column()
    ghi: number;

    @Column()
    period_end: string;

    @Column()
    period: string;
}
