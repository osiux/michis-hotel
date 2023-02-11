import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { parseISO, format } from "date-fns";
import { Room } from "./room.entity";
import { Booking } from "./booking.entity";

@Injectable()
export class RoomsService {
	constructor(
		@InjectRepository(Room)
		private roomsRepository: Repository<Room>,
		@InjectRepository(Booking)
		private bookingRepository: Repository<Booking>
	) {}

	async findAll() {
		return this.roomsRepository.find({
			relations: {
				bookings: true,
			},
		});
	}

	async findOne(id: string) {
		return this.roomsRepository.findOneBy({ id });
	}

	async create(name: string) {
		const room = this.roomsRepository.create({
			name: name,
		});

		return this.roomsRepository.save(room);
	}

	async remove(id: string) {
		await this.roomsRepository.delete(id);
	}

	/**
	 * Availability cases SQL from https://stackoverflow.com/a/29213615
	 */
	async isBookedForDates(id: string, to: string, from: string) {
		const bookings = await this.bookingRepository
			.createQueryBuilder("bookings")
			.where("bookings.room = :id", { id: id })
			.andWhere(
				"((bookings.booked_from <= :booked_from AND bookings.booked_to >= :booked_to) OR (bookings.booked_from < :booked_to AND bookings.booked_to >= :booked_to) OR (:booked_from <= bookings.booked_from AND :booked_to >= bookings.booked_to))",
				{
					booked_from: format(parseISO(to), "yyyy-MM-dd"),
					booked_to: format(parseISO(from), "yyyy-MM-dd"),
				}
			)
			.getCount();

		return bookings > 0;
	}

	async book(id: string, from: string, to: string) {
		const isBooked = await this.isBookedForDates(id, from, to);
		const room = await this.roomsRepository.findOneBy({
			id,
		});

		if (!room) {
			throw new Error("Room doesn't exist.");
		}

		if (isBooked) {
			throw new Error("Dates already booked.");
		}

		const booking = this.bookingRepository.create({
			booked_from: format(parseISO(from), "yyyy-MM-dd"),
			booked_to: format(parseISO(to), "yyyy-MM-dd"),
			room,
		});

		return await this.bookingRepository.save(booking);
	}

	async checkIn(id: string) {
		const today = format(new Date(), "yyyy-MM-dd");
		const room = await this.roomsRepository.findOneBy({
			id,
		});

		if (!room) {
			throw new Error("Room doesn't exist.");
		}

		const isBooked = await this.bookingRepository
			.createQueryBuilder("bookings")
			.where("bookings.room = :id", { id })
			.andWhere("bookings.booked_from >= :booked_from", {
				booked_from: today,
			})
			.getCount();

		if (isBooked > 0) {
			throw new Error("A guest is already there!");
		}

		const booking = this.bookingRepository.create({
			booked_from: today,
			room,
		});

		return await this.bookingRepository.save(booking);
	}

	async checkOut(id: string) {
		const today = format(new Date(), "yyyy-MM-dd");

		const isBooked = await this.bookingRepository
			.createQueryBuilder("bookings")
			.where("bookings.room = :id", { id })
			.andWhere("bookings.booked_from >= :booked_from", {
				booked_from: today,
			})
			.getOne();

		if (!isBooked) {
			throw new Error("No existing booking for this room.");
		}

		await this.bookingRepository.delete({ id: isBooked.id });
	}
}
