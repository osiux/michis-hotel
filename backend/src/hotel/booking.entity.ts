import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";

import { Room } from "./room.entity";

@Entity("bookings")
export class Booking {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("date")
	booked_from: Date;

	@Column({
		type: "date",
		nullable: true,
		default: null,
	})
	booked_to!: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => Room, (room) => room.bookings)
	room: Room;
}
