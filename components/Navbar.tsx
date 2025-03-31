/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Circle,
	Icon,
	Text,
	Stack,
	Link,
	Flex,
	Input,
	InputGroup,
	Button,
	Avatar,
	Menu,
	Portal,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/store/authSlice";
import { logOut as userLogout } from "@/store/userSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const { userData } = useSelector((state: any) => state.user);
	const router = useRouter();
	const { items } = useSelector((state: any) => state.cart);
	const { favItems } = useSelector((state: any) => state.favorite);
	const [query, setQuery] = useState<any>("");

	const handleQueryChange = (e: any) => {
		setQuery(e?.target?.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		router.push(`/search?q=${query}`);
	};

	const handleLogOut = async () => {
		await Promise.all([dispatch(logOut()), dispatch(userLogout())]);
		router.push("/login");
	};

	// console.log(userData);

	return (
		<Box px={{ base: 3, sm: 6, lg: 10 }} bg="gray.50" py={{ base: 8 }}>
			<Box maxW="1360px" w="full" mx="auto">
				<Flex align="center" justify="space-between" gap={{ base: 6 }}>
					<Link
						href="/"
						_hover={{ textDecoration: "none" }}
						cursor="pointer"
						_focus={{
							focusRingWidth: 0,
						}}
					>
						<Text fontSize={{ base: "4xl", lg: "6xl" }}>🏪</Text>
					</Link>
					<Box maxW="lg" w="full" mx="auto" display={{ base: "none", md: "block" }}>
						<form onSubmit={handleSubmit}>
							<InputGroup alignItems="center">
								<Input
									type="text"
									placeholder="Search product"
									rounded="lg"
									h={12}
									fontFamily="glight"
									value={query}
									name="query"
									id="query"
									fontSize="lg"
									onChange={handleQueryChange}
								/>
							</InputGroup>
						</form>
					</Box>
					<Stack align="center" direction="row" gap={10}>
						<Stack align="center" direction="row" w="fit" gap={6}>
							<Box
								_focus={{
									focusRingWidth: 0,
								}}
							>
								<Link
									href="/cart"
									_hover={{ textDecoration: "none" }}
									_focus={{
										focusRingWidth: 0,
									}}
								>
									<Box pos="relative">
										<Icon as={IoBagOutline} w={8} h={8} color="black" />
										<Circle
											size="20px"
											bg="red.200"
											pos="absolute"
											top={-1}
											right={-2}
											display="flex"
											flexDir="column"
											justifyContent="center"
											alignItems="center"
											rounded="full"
											fontFamily="greg"
											p={3}
										>
											<Text mt="-1px" color="black">
												{items?.length ? items?.length : 0}
											</Text>
										</Circle>
									</Box>
								</Link>
							</Box>
							<Link
								href="/favorite"
								_hover={{ textDecoration: "none" }}
								_focus={{
									focusRingWidth: 0,
								}}
							>
								<Box pos="relative">
									<Icon as={IoIosHeartEmpty} w={8} h={8} color="black" />
									<Circle
										size="20px"
										bg="red.200"
										pos="absolute"
										top={-1}
										right={-2}
										display="flex"
										flexDir="column"
										justifyContent="center"
										alignItems="center"
										rounded="full"
										fontFamily="greg"
										p={3}
									>
										<Text mt="-1px" color="black">
											{favItems?.length ? favItems?.length : 0}
										</Text>
									</Circle>
								</Box>
							</Link>
						</Stack>

						{userData === null && (
							<Link
								href="/login"
								_hover={{ textDecoration: "none" }}
								_focus={{
									focusRingWidth: 0,
								}}
							>
								<Button
									fontFamily="glight"
									bg="black"
									color="white"
									variant="solid"
									fontSize="lg"
									px={10}
									py={6}
									_hover={{ bg: "#222222" }}
									transition="background-color ease-in-out 0.3s"
									rounded="xl"
								>
									Log in
								</Button>
							</Link>
						)}
						{userData && (
							<Menu.Root>
								<Menu.Trigger asChild>
									<Button
										variant="outline"
										size="sm"
										bg="transparent"
										borderColor="transparent"
										borderWidth="0px"
										_focus={{
											focusRingWidth: 0,
										}}
									>
										<Avatar.Root shape="full" size="md">
											<Avatar.Fallback name={userData?.firstName} />
											<Avatar.Image src={userData?.image} />
										</Avatar.Root>
									</Button>
								</Menu.Trigger>
								<Portal>
									<Menu.Positioner>
										<Menu.Content>
											{/* <Menu.Item value="profile" fontFamily="greg" cursor="pointer">
												Profile
											</Menu.Item> */}
											<Menu.Item value="log-out" fontFamily="greg" cursor="pointer" onClick={handleLogOut}>
												Log out
											</Menu.Item>
										</Menu.Content>
									</Menu.Positioner>
								</Portal>
							</Menu.Root>
						)}
					</Stack>
				</Flex>
			</Box>
			<Box w="full" mx="auto" display={{ base: "block", md: "none" }} mt={8}>
				<form onSubmit={handleSubmit} style={{ width: "full" }}>
					<InputGroup alignItems="center">
						<Input
							type="text"
							placeholder="Search product"
							rounded="lg"
							h={12}
							fontFamily="glight"
							value={query}
							name="query"
							id="query"
							fontSize="lg"
							onChange={handleQueryChange}
							w="full"
						/>
					</InputGroup>
				</form>
			</Box>
		</Box>
	);
};

export default Navbar;
