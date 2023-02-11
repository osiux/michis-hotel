import React from 'react';
import tw from "twin.macro";
import { Link as RouterLink } from "react-router-dom";

const Nav = tw.nav`relative
w-full
flex flex-wrap
items-center
justify-between
py-4
bg-gray-100
text-gray-500
hover:text-gray-700
focus:text-gray-700`;
const Container = tw.div`container w-full flex flex-wrap items-center justify-between px-6`;
const Logo = tw(RouterLink)`flex
items-center
text-gray-900
hover:text-gray-900
focus:text-gray-900
mt-2
lg:mt-0
mr-1`;

const Links = tw.ul`flex flex pl-0 mr-auto`;
const LinkItem = tw.li`p-2`;
const Link = tw(RouterLink)`text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0`;

const Header = () => (
	<Nav>
		<Container>
			<Logo to="/">
				<img tw="rounded-lg" src="https://placekitten.com/100/50" alt="Michis Hotel" />
			</Logo>
			<Links>
				<LinkItem>
					<Link to="/">Rooms</Link>
				</LinkItem>
				<LinkItem>
					<Link to="create">Create Room</Link>
				</LinkItem>
			</Links>
		</Container>
	</Nav>
);

export default Header;
