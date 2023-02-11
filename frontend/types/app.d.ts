type Room = {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	bookings: Booking[];
};

type Booking = {
	id: string;
	booked_from: string;
	booked_to: string;
	created_at: string;
	updated_at: string;
	room: Room;
};
