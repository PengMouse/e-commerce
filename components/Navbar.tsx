/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Circle, Icon, Text, Stack, Link, Flex } from "@chakra-ui/react";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoIosHeartEmpty } from "react-icons/io";
const Navbar = () => {
	const { items } = useSelector((state: any) => state.cart);
	const { favItems } = useSelector((state: any) => state.favorite);
	// console.log(items);
	// console.log(favItems);

	return (
		<Box p={6} bg="gray.50">
			<Box maxW="1360px" w="full" mx="auto" px={{ base: 6, lg: 10 }}>
				<Flex align="center" justify="space-between">
					<Link href="/" _hover={{ textDecoration: "none" }} cursor="pointer">
						<Text fontSize="4xl">🏪</Text>
					</Link>
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
		</Box>
	);
};

export default Navbar;
