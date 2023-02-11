import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";

import { Booking } from "./booking.entity";

@Entity("rooms")
export class Room {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => Booking, (booking) => booking.room)
	bookings: Booking[];
}
