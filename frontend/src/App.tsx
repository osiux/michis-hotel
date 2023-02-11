import React from "react";
import tw from "twin.macro";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { Header, RoomListing, CreateRoom, BookRoom } from "./components";

const queryClient = new QueryClient();

const Container = tw.main`container mt-10 flex justify-center min-w-full`;

const Layout = () => (
	<>
		<Header />
		<Container>
			<Outlet />
		</Container>
	</>
);

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<RoomListing />} />
						<Route path="create" element={<CreateRoom />} />
						<Route path="rooms/:id" element={<BookRoom />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
