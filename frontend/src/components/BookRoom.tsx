import { useState, forwardRef } from "react";
import tw from "twin.macro";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useRoom, useRoomActions } from "../hooks/queries";

import { Form, Label, Input, Button } from "./CreateRoom";

const Title = tw.h1`mb-10 font-bold`;
const ErrorMessage = tw.div`bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3`;
const SuccessMessage = tw.div`bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3`;

const CustomDateInput = forwardRef<HTMLInputElement>(
	// @ts-ignore
	({ value, onClick }, ref) => (
		<Input value={value} ref={ref} onClick={onClick} readOnly />
	)
);

const BookRoom = () => {
	const [from, setFrom] = useState<Date | null>(new Date());
	const [to, setTo] = useState<Date | null>(addDays(new Date(), 6));
	const params = useParams();
	const { data: room, isLoading } = useRoom(params.id);
	const { booking } = useRoomActions();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!room) {
			return;
		}

		booking.mutate({ roomId: room.id, from, to });
	};

	if (isLoading) return null;

	return (
		<Form onSubmit={onSubmit}>
			<Title>Book a date for room: {room?.name} </Title>
			{booking.isError && (
				<ErrorMessage role="alert">
					Those dates are already booked for this room.
				</ErrorMessage>
			)}
			{booking.isSuccess && (
				<SuccessMessage role="alert">
					Room booked successfully!
				</SuccessMessage>
			)}
			<Label htmlFor="from">From:</Label>
			<DatePicker
				selected={from}
				onChange={(date) => setFrom(date)}
				selectsStart
				startDate={from}
				endDate={to}
				customInput={<CustomDateInput />}
			/>
			<Label htmlFor="to">To:</Label>
			<DatePicker
				selected={to}
				onChange={(date) => setTo(date)}
				selectsEnd
				startDate={from}
				endDate={to}
				minDate={from}
				customInput={<CustomDateInput />}
			/>

			<Button type="submit" disabled={booking.isLoading}>
				{booking.isLoading ? "Booking..." : "Book Room"}
			</Button>
		</Form>
	);
};

export default BookRoom;
