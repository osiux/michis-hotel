import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HotelModule } from "./hotel/hotel.module";

@Module({
	imports: [HotelModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
