import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";
import { Room } from "./room.entity";
import { Booking } from "./booking.entity";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "./michis-hotel.sqlite",
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
			synchronize: true,
			logging: true,
		}),
		TypeOrmModule.forFeature([Room, Booking]),
	],
	controllers: [RoomsController],
	providers: [RoomsService],
})
export class HotelModule {}
