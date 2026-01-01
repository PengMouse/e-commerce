/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Stack, Icon, Text, SimpleGrid, Image, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import { CgArrowLeft } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/store/cartSlice";
import PaymentBtn from "@/components/PaymentBtn";

interface Deets {
	name: string;
	email: string;
	phone: number | any;
	address: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
}
const Cart = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [custDetails, setCustDetails] = useState<Deets>({
		name: "",
		email: "",
		phone: 0,
		address: "",
		city: "",
		state: "",
		postal_code: "",
		country: "",
	});

	const handleDeetsChange = (name: string, value: string) => {
		setCustDetails({
			...custDetails,
			[name]: value,
		});
	};
	const { items } = useSelector((state: any) => state.cart);

	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 3000,
		});
	};

	const handleRemoveItem = (id: any) => {
		dispatch(removeItem(id));
		handleNotification("info", "😏 Item removed from cart", "");
	};

	const [getSum, setSum] = useState<any>(0);

	useEffect(() => {
		const getTotal = items?.map((item: any) => item.quantity * item.price);
		const sum = getTotal?.reduce((acc: any, curr: any) => acc + curr, 0);
		setSum(parseFloat(sum.toFixed(2)));
	}, [items]);

	useEffect(() => {
		if (items?.length === 0) {
			setCustDetails({
				name: "",
				email: "",
				phone: 0,
				address: "",
				city: "",
				state: "",
				postal_code: "",
				country: "",
			});
		}
	}, [items]);

	return (
		<Box
			maxW="1360px"
			w="full"
			mx="auto"
			px={{ base: 6, lg: 10 }}
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="start"
			py={{ base: 10 }}
		>
			<Toaster />
			<Stack direction="row" align="center" mb={10} onClick={() => router.back()} cursor="pointer">
				<Icon as={CgArrowLeft} color="black" w={7} h={7} mt="1px" />
				<Box fontFamily="greg" color="black" fontSize="xl">
					Back
				</Box>
			</Stack>
			<Flex
				justify="space-between"
				w="full"
				direction={{ base: "column", sm: "row" }}
				gap={{ base: 5, sm: 0 }}
			>
				<Text fontFamily="greg" fontSize="3xl" color="black">
					Cart
				</Text>
				<Stack
					align={{ base: "start", sm: "center" }}
					direction={{ base: "column", sm: "row" }}
					gap={4}
				>
					<Text fontFamily="greg" color="black" fontSize="2xl">
						Total:{" "}
						<Text textDecoration="line-through" as="span">
							N
						</Text>
						{getSum.toLocaleString("en-US")}
					</Text>
					<Box>
						<PaymentBtn
							amount={getSum}
							name={custDetails.name}
							email={custDetails.email}
							phone={custDetails.phone}
							address={custDetails.address}
							city={custDetails.city}
							state={custDetails.state}
							postal_code={custDetails.postal_code}
							country={custDetails.country}
						/>
					</Box>
				</Stack>
			</Flex>
			<Box h="1px" bg="gray.300" minW="200px" w="full" my={6} />

			{items?.length >= 1 && (
				<Box display="flex" flexDirection={{ base: "column", lg: "row" }} gap={5} w="full">
					<SimpleGrid
						columns={{ base: 1, sm: 2, xl: 3 }}
						w="full"
						gap={4}
						maxH="600px"
						overflow="auto"
						my={3}
					>
						{items?.map((i: any, index: number) => (
							<Box key={index} w="full" h="fit">
								<Box
									py={2}
									px={6}
									bg="gray.50"
									rounded="lg"
									h="100%"
									display="flex"
									flexDirection="column"
									justifyContent="center"
								>
									<Flex
										justify="space-between"
										align="top"
										direction={{ base: "column" }}
										gap={{ base: 5, lg: 10, xl: 5 }}
									>
										<Box
											justifyContent="center"
											alignItems="center"
											display="flex"
											flexDirection="column"
											w="fit"
											mx="auto"
										>
											<Box
												maxW={{ base: "100px", xl: "fit" }}
												w="fit"
												h={{ base: "100px", xl: "100px" }}
												mx="auto"
											>
												<Image
													src={i?.images[0]}
													objectFit="contain"
													alt=""
													h={{ base: "100px", xl: "100px" }}
													w="fit"
													mx="auto"
												/>
											</Box>
										</Box>

										<Stack w="full">
											<Text fontFamily="glight" color="black" fontSize="md" lineClamp={1} maxW="xs">
												<Text as="span" fontFamily="greg" opacity={0.6}>
													Name:
												</Text>{" "}
												{i?.title}
											</Text>
											<Stack direction={{ base: "column" }} align={{ base: "start" }} gap={{ base: 2 }}>
												<Flex flexWrap="wrap" align="center" gap={4}>
													<Text
														fontFamily="glight"
														color="black"
														fontSize="md"
														maxW="xs"
														textTransform="capitalize"
														w="fit"
													>
														<Text as="span" fontFamily="greg" opacity={0.6}>
															Size:{" "}
														</Text>
														{i?.size}
													</Text>
													<Text
														fontFamily="glight"
														color="black"
														fontSize="md"
														maxW="xs"
														textTransform="capitalize"
														w="fit"
													>
														<Text as="span" fontFamily="greg" opacity={0.6}>
															Color:{" "}
														</Text>
														{i?.color}
													</Text>
													<Text
														fontFamily="glight"
														color="black"
														fontSize="md"
														lineClamp={1}
														maxW="xs"
														textTransform="capitalize"
														w="fit"
													>
														<Text as="span" fontFamily="greg" opacity={0.6}>
															Quantity:
														</Text>{" "}
														{i?.quantity}
													</Text>
												</Flex>

												<Text
													fontFamily="glight"
													color="black"
													fontSize="md"
													lineClamp={1}
													maxW="xs"
													textTransform="capitalize"
												>
													<Text as="span" fontFamily="greg" opacity={0.6}>
														Category:
													</Text>{" "}
													{i?.category}
												</Text>
											</Stack>

											<Text fontFamily="gmid" color="black" fontSize="md">
												<Text as="span" fontFamily="greg" opacity={0.6}>
													Price:
												</Text>{" "}
												<Text textDecoration="line-through" as="span">
													N
												</Text>
												{(i?.quantity * i?.price).toLocaleString("en-US")}
											</Text>
											<Stack w="fit-content" direction="column" align="start" gap={1}>
												<Text
													color="red"
													fontFamily="glight"
													cursor="pointer"
													onClick={() => handleRemoveItem(i?.id)}
												>
													Remove item
												</Text>
											</Stack>
										</Stack>
									</Flex>
								</Box>
							</Box>
						))}
					</SimpleGrid>

					<Box
						maxW={{ base: "full", lg: "xs" }}
						w="full"
						flexShrink="none"
						borderWidth="1px"
						borderColor="black"
						rounded="lg"
					>
						<Box
							bg="black"
							color="white"
							py={2}
							px={2}
							w="full"
							direction="flex"
							flexDir="column"
							justifyContent="center"
							alignItems="center"
							flexShrink="none"
							fontWeight="normal"
							fontSize="lg"
							textAlign="center"
							roundedTop="lg"
						>
							Delivery Details
						</Box>
						<Stack gap={4} p={4}>
							{/* Name */}
							<Box>
								<Text fontWeight="semibold">Name:</Text>
								<Input
									name="name"
									id="name"
									value={custDetails?.name}
									onChange={(e: any) => handleDeetsChange("name", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* email */}
							<Box>
								<Text fontWeight="semibold">Email:</Text>
								<Input
									name="email"
									id="email"
									type="email"
									value={custDetails?.email}
									onChange={(e: any) => handleDeetsChange("email", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* phone */}
							<Box>
								<Text fontWeight="semibold">Phone:</Text>
								<Input
									name="phone"
									id="phone"
									type="tel"
									value={custDetails?.phone}
									onChange={(e: any) => handleDeetsChange("phone", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* address */}
							<Box>
								<Text fontWeight="semibold">Address:</Text>
								<Input
									name="address"
									id="address"
									value={custDetails?.address}
									onChange={(e: any) => handleDeetsChange("address", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* city */}
							<Box>
								<Text fontWeight="semibold">City:</Text>
								<Input
									name="city"
									id="city"
									value={custDetails?.city}
									onChange={(e: any) => handleDeetsChange("city", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* state */}
							<Box>
								<Text fontWeight="semibold">State:</Text>
								<Input
									name="state"
									id="state"
									value={custDetails?.state}
									onChange={(e: any) => handleDeetsChange("state", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* Postal code */}
							<Box>
								<Text fontWeight="semibold">Postal Code:</Text>
								<Input
									name="postal_code"
									id="postal_code"
									value={custDetails?.postal_code}
									onChange={(e: any) => handleDeetsChange("postal_code", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>

							{/* Country */}
							<Box>
								<Text fontWeight="semibold">Country:</Text>
								<Input
									name="country"
									id="country"
									value={custDetails?.country}
									onChange={(e: any) => handleDeetsChange("country", e?.target?.value)}
									color="black"
									bg="white"
									borderWidth="1px"
									borderColor="black"
									rounded="lg"
								/>
							</Box>
						</Stack>
					</Box>
				</Box>
			)}

			{items?.length === 0 && (
				<Text color="#333333" fontFamily="greg" fontSize={{ base: "2xl", lg: "3xl" }} mx="auto">
					Your cart is empty! 😒
				</Text>
			)}
		</Box>
	);
};

export default Cart;
