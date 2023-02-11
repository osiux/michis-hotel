import {
	Body,
	Controller,
	Get,
	Post,
	Param,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { Room } from "./room.entity";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto, BookRoomDto } from "./dto/rooms.dto";

@Controller("/rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Get()
	async getAll(): Promise<Room[]> {
		return this.roomsService.findAll();
	}

	@Get(":id")
	async getOne(@Param("id") id: string): Promise<Room> {
		return this.roomsService.findOne(id);
	}

	@Post()
	async create(@Body() createRoomDto: CreateRoomDto) {
		const room = await this.roomsService.create(createRoomDto.name);

		return room;
	}

	@Post(":id/book")
	async bookRoom(@Param("id") id: string, @Body() bookRoomDto: BookRoomDto) {
		try {
			return this.roomsService.book(id, bookRoomDto.from, bookRoomDto.to);
		} catch (e) {
			throw new HttpException(
				{
					status: HttpStatus.FORBIDDEN,
					error: e.message,
				},
				HttpStatus.FORBIDDEN
			);
		}
	}

	@Post(":id/check-in")
	async checkIn(@Param("id") id: string) {
		try {
			return this.roomsService.checkIn(id);
		} catch (e) {
			throw new HttpException(
				{
					status: HttpStatus.FORBIDDEN,
					error: e.message,
				},
				HttpStatus.FORBIDDEN
			);
		}
	}

	@Post(":id/check-out")
	async checkOut(@Param("id") id: string) {
		try {
			return this.roomsService.checkOut(id);
		} catch (e) {
			throw new HttpException(
				{
					status: HttpStatus.FORBIDDEN,
					error: e.message,
				},
				HttpStatus.FORBIDDEN
			);
		}
	}
}
