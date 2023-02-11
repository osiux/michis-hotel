import React from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";

import { useRoomActions, useRooms } from "../hooks/queries";

const Table = tw.table`min-w-full`;
const Th = tw.th`text-sm font-medium text-gray-900 px-6 py-4 text-left`;
const BookButton = tw(
	Link
)`inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mr-5`;
const DeleteButton = tw.button`inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out`;
const CheckInButton = tw.button`inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out mr-5`;
const CheckOutButton = tw.button`inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out mr-5`;

const formatDate = (date: string) => {
	const parsed = parseISO(date);

	return format(parsed, "yyyy-MM-dd");
};

const RoomListing = () => {
	const { data: rooms } = useRooms();
	const { checkIn, checkOut } = useRoomActions();

	const onDelete = (id: string) => {
		const sure = confirm("Are you sure?");

		if (sure) {
			// TODO: implement delete
		}
	};

	const onCheckIn = async (id: string) => {
		await checkIn.mutate(id);
	};
	const onCheckOut = async (id: string) => {
		await checkOut.mutate(id);
	};

	return (
		<Table>
			<thead tw="border-b">
				<tr>
					<Th scope="col">Name</Th>
					<Th scope="col">Created</Th>
					<Th scope="col">Actions</Th>
				</tr>
			</thead>
			<tbody>
				{rooms?.map((room) => (
					<tr key={room.id} tw="border-b">
						<td tw="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							{room.name}
						</td>
						<td tw="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							{formatDate(room.created_at)}
						</td>
						<td tw="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<BookButton to={`rooms/${room.id}`}>
								Book
							</BookButton>
							{room.bookings.length > 0 ? (
								<CheckOutButton
									onClick={() => onCheckOut(room.id)}
									disabled={checkOut.isLoading}
								>
									{checkOut.isLoading
										? "Checking out..."
										: "Check Out"}
								</CheckOutButton>
							) : (
								<CheckInButton
									onClick={() => onCheckIn(room.id)}
									disabled={checkIn.isLoading}
								>
									{checkIn.isLoading
										? "Checking in..."
										: "Check In"}
								</CheckInButton>
							)}

							<DeleteButton
								type="button"
								onClick={() => onDelete(room.id)}
							>
								Delete
							</DeleteButton>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default RoomListing;
