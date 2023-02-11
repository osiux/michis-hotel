import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useNavigate } from "react-router-dom";

const api = ky.create({
	prefixUrl: "http://localhost:3000/",
});

const useRooms = () => {
	return useQuery(["rooms"], () => api.get("rooms").json<Room[]>());
};

const useRoom = (id: string | undefined) => {
	return useQuery(["rooms", id], () => api.get(`rooms/${id}`).json<Room>(), {
		enabled: !!id,
	});
};

const useCreateRoom = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (name: string) => {
			return api
				.post("rooms", {
					json: {
						name,
					},
				})
				.json<Room>();
		},
		onSuccess: () => {
			navigate("/");
		},
	});
};

const useRoomActions = () => {
	const queryClient = useQueryClient();

	const booking = useMutation({
		mutationFn: ({
			roomId,
			from,
			to,
		}: {
			roomId: string;
			from: string | Date | null;
			to: string | Date | null;
		}) => {
			return api
				.post(`rooms/${roomId}/book`, {
					json: {
						from,
						to,
					},
				})
				.json<Booking>();
		},
	});

	const checkIn = useMutation({
		mutationFn: (roomId: string) => {
			return api.post(`rooms/${roomId}/check-in`).json<Booking>();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});

	const checkOut = useMutation({
		mutationFn: (roomId: string) => {
			return api.post(`rooms/${roomId}/check-out`).json<Booking>();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});

	return { booking, checkIn, checkOut };
};

export { useRooms, useRoom, useCreateRoom, useRoomActions };
