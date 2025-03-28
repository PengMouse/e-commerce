/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Circle, Icon, Text, Stack, Link, Flex, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoIosHeartEmpty } from "react-icons/io";
import { useRouter } from "next/router";
const Navbar = () => {
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

	return (
		<Box p={6} bg="gray.50">
			<Box maxW="1360px" w="full" mx="auto" px={{ base: 6, lg: 10 }}>
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
					<Box maxW="lg" w="full" mx="auto" display={{ base: "none", sm: "block" }}>
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
				</Flex>
			</Box>
			<Box w="full" mx="auto" display={{ base: "block", sm: "none" }} mt={4}>
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
