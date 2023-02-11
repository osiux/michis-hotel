import { useState } from "react";
import tw from "twin.macro";
import { useCreateRoom } from "../hooks/queries";

export const Form = tw.form`block p-6 rounded-lg shadow-lg bg-white w-1/2`;
export const Label = tw.label`inline-block mb-2 text-gray-700`;
export const Input = tw.input`block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;
export const Button = tw.button`mt-6
px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out`;

const CreateRoom = () => {
	const [name, setName] = useState("");
	const mutation = useCreateRoom();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await mutation.mutate(name);
	};

	return (
		<Form onSubmit={onSubmit}>
			<Label htmlFor="name">Room Name:</Label>
			<Input
				type="text"
				name="name"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<Button type="submit" disabled={mutation.isLoading}>
				{mutation.isLoading ? "Creating..." : "Submit"}
			</Button>
		</Form>
	);
};

export default CreateRoom;
