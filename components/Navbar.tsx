/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Circle,
	Icon,
	Text,
	Stack,
	Flex,
	Input,
	InputGroup,
	Button,
	Avatar,
	Menu,
	Portal,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/store/authSlice";
import { logOut as userLogout } from "@/store/userSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { RiSearchFill } from "react-icons/ri";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { deleteCookie } from "cookies-next";
const Navbar = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { userData } = useSelector((state: any) => state.user);
	const { items } = useSelector((state: any) => state.cart);

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
		deleteCookie("authToken");
		router.push("/login");
	};

	console.log(userData);

	return (
		<Box>
			<Box px={{ base: 3, sm: 6, lg: 10 }} bg="gray.50" py={{ base: 4 }}>
				<Box maxW="1360px" w="full" mx="auto">
					<Flex align="center" justify="space-between" gap={{ base: 6 }}>
						<Link href="/">
							<Text fontSize={{ base: "3xl", lg: "4xl" }}>🏪</Text>
						</Link>
						<Box maxW="lg" w="full" mx="auto" display={{ base: "block" }}>
							<form onSubmit={handleSubmit}>
								<InputGroup alignItems="center">
									<Input
										type="text"
										placeholder="Search product"
										rounded="lg"
										h={10}
										fontFamily="glight"
										value={query}
										name="query"
										id="query"
										fontSize="md"
										onChange={handleQueryChange}
									/>
								</InputGroup>
							</form>
						</Box>
						<Stack align="center" direction="row" gap={10} display={{ base: "none", sm: "flex" }}>
							<Stack align="center" direction="row" w="fit" gap={6}>
								<Box
									_focus={{
										focusRingWidth: 0,
									}}
								>
									<Link href="/cart">
										<Box pos="relative">
											<Icon as={MdOutlineShoppingCart} w={8} h={8} color="black" />
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
								<Link href="/favorite">
									<Box pos="relative">
										<Icon as={FaRegHeart} w={8} h={8} color="black" />
									</Box>
								</Link>
							</Stack>
							{userData === null && (
								<Link href="/login">
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

							{userData !== null && (
								<Menu.Root>
									<Menu.Trigger asChild>
										<Button
											variant="outline"
											size="sm"
											bg="transparent"
											borderColor="transparent"
											borderWidth="0px"
											px={0}
											_focus={{
												focusRingWidth: 0,
											}}
										>
											<Avatar.Root shape="full" size="md">
												<Avatar.Fallback name={userData?.displayName} />
												<Avatar.Image src={userData?.photoURL} />
											</Avatar.Root>
										</Button>
									</Menu.Trigger>
									<Portal>
										<Menu.Positioner>
											<Menu.Content>
												<Link href="/profile">
													<Menu.Item value="profile" fontFamily="greg" cursor="pointer">
														Profile
													</Menu.Item>
												</Link>
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
				<Box w="full" mx="auto" display={{ base: "none", md: "none" }} mt={8}>
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
			{/* bottom navs for mobile */}
			<Flex
				justify="space-between"
				align="center"
				bg="gray.100"
				px={{ base: 8, sm: 10 }}
				h={20}
				boxShadow="md"
				pos="fixed"
				bottom={0}
				left={0}
				right={0}
				mx="auto"
				w="full"
				zIndex={10}
				display={{ base: "flex", sm: "none" }}
			>
				{/* home */}
				<Link href="/">
					<Icon
						as={router?.pathname === "/" ? AiFillHome : AiOutlineHome}
						color="black"
						boxSize={{ base: 6, sm: 7 }}
					/>
				</Link>

				{/* search */}
				<Link href="/search">
					<Icon
						as={router?.pathname === "/search" ? RiSearchFill : IoSearch}
						color="black"
						boxSize={{ base: 6, sm: 7 }}
					/>
				</Link>

				{/* cart */}
				<Link href="/cart">
					<Box pos="relative">
						<Icon
							as={router?.pathname === "/cart" ? IoMdCart : MdOutlineShoppingCart}
							w={{ base: 6, sm: 8 }}
							h={{ base: 6, sm: 8 }}
							color="black"
						/>
						<Circle
							size="20px"
							bg="red.200"
							pos="absolute"
							top={-1}
							right={-3}
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

				{/* favorites */}
				<Link href="/favorite">
					<Box pos="relative">
						<Icon
							as={router?.pathname === "/favorite" ? FaHeart : FaRegHeart}
							w={{ base: 6, sm: 8 }}
							h={{ base: 6, sm: 8 }}
							color="black"
						/>
						{/* <Circle
							size="20px"
							bg="red.200"
							pos="absolute"
							top={-1}
							right={-3}
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
						</Circle> */}
					</Box>
				</Link>

				{/* user profile */}
				<Menu.Root>
					<Menu.Trigger asChild>
						<Button
							variant="outline"
							size="sm"
							bg="transparent"
							borderColor="transparent"
							borderWidth="0px"
							px={0}
							_focus={{
								focusRingWidth: 0,
							}}
						>
							<Icon
								as={router?.pathname === "/profile" ? FaUserCircle : FaRegUserCircle}
								w={{ base: 6, sm: 8 }}
								h={{ base: 6, sm: 8 }}
								color="black"
							/>
						</Button>
					</Menu.Trigger>
					<Portal>
						<Menu.Positioner>
							{userData === null ? (
								<Menu.Content>
									<Link href="/login">
										<Menu.Item value="log-out" fontFamily="greg" cursor="pointer" onClick={handleLogOut}>
											Log in
										</Menu.Item>
									</Link>
								</Menu.Content>
							) : (
								<Menu.Content>
									<Link href="/profile">
										<Menu.Item value="profile" fontFamily="greg" cursor="pointer">
											Profile
										</Menu.Item>
									</Link>
									<Menu.Item value="log-out" fontFamily="greg" cursor="pointer" onClick={handleLogOut}>
										Log out
									</Menu.Item>
								</Menu.Content>
							)}
						</Menu.Positioner>
					</Portal>
				</Menu.Root>
			</Flex>
		</Box>
	);
};

export default Navbar;
