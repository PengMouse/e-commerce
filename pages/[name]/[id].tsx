/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Box,
	Image,
	Text,
	Flex,
	Stack,
	Circle,
	Icon,
	Button,
	Skeleton,
	SkeletonText,
} from "@chakra-ui/react";
import useGetProduct from "@/components/hooks/getProduct";
import ReactStars from "react-stars";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CgArrowLeft } from "react-icons/cg";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/favoriteSlice";
import { addItem, increaseItem, decreaseItem, clearCart } from "@/store/cartSlice";
import { Toaster, toaster } from "@/components/ui/toaster";
const ViewPage = () => {
	const router = useRouter();
	const { id }: any = router.query;
	const { getProduct, isData } = useGetProduct();
	const dispatch = useDispatch();
	const sizes = [
		{ name: "S", value: "small" },
		{ name: "M", value: "medium" },
		{ name: "L", value: "large" },
	];

	const colors = [
		{ name: "#d30000", value: "red" },
		{ name: "#000000", value: "black" },
		{ name: "#130066", value: "blue" },
	];
	const [activeSize, setActiveSize] = useState<any>("");
	const [activeColor, setActiveColor] = useState<any>("");
	const { favItems } = useSelector((state: any) => state.favorite);
	const { items } = useSelector((state: any) => state.cart);

	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 2000,
		});
	};

	const handleToggleFavorite = (id: any, name: any) => {
		const isFavorite = favItems.some((item: any) => item.id === id);
		if (!isFavorite) {
			handleNotification("info", "❤️ Item added to favorite", name);
		} else if (isFavorite) {
			handleNotification("info", "😏 Item removed from favorite", name);
		}
		dispatch(toggleFavorite(isData));
	};

	const handleAddToCart = (data: any, name: any) => {
		dispatch(addItem({ ...data, color: activeColor, size: activeSize, quantity: qty }));
		handleNotification("info", "🤑 Item added to cart", `${name}`);
	};

	const handleIncrease = (id: any) => {
		const item = items.some((item: any) => item.id === id);
		if (item) {
			dispatch(increaseItem(id));
			handleNotification("info", "🤑 Item added to cart", `${isData?.title}`);
		} else {
			dispatch(addItem({ ...isData, color: activeColor, size: activeSize }));
			handleNotification("info", "🤑 Item added to cart", `${isData?.title}`);
		}
	};

	const handleDecrease = (id: any) => {
		dispatch(decreaseItem(id));
		handleNotification("info", "😏 Item removed from cart", `${isData?.title}`);
	};
	const [qty, setQty] = useState<any>(1);

	const increase = () => {
		setQty(qty + 1);
	};

	const decrease = () => {
		setQty(qty - 1);
	};
	const handleClearCart = () => {
		dispatch(clearCart());
		handleNotification("info", "😏 Cart cleared", "");
	};

	const handleActiveSize = (value: any) => {
		setActiveSize(value);
	};
	const handleActiveColor = (value: any) => {
		setActiveColor(value);
	};

	useEffect(() => {
		const getData = async () => {
			await getProduct(id);
		};
		if (id) {
			getData();
		}
	}, [id]);

	useEffect(() => {
		console.log(items);
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
			<Flex gap={8} w="full" direction={{ base: "column", lg: "row" }}>
				{!isData?.images ? (
					<Skeleton
						minW="200px"
						w={{ base: "full", sm: "400px" }}
						h={{ base: "300px", lg: "400px" }}
						rounded="2xl"
						css={{
							"--start-color": "colors.gray.50",
							"--end-color": "colors.gray.200",
						}}
						variant="shine"
					/>
				) : (
					<Box
						maxW={{ base: "full", md: "400px" }}
						w="full"
						p={6}
						rounded="2xl"
						borderWidth="2px"
						borderColor="gray.100"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
					>
						<Image src={isData?.images[0]} alt="" w="full" h="300px" objectFit="contain" />
					</Box>
				)}

				<Box w="full">
					{!isData?.title ? (
						<SkeletonText
							h={10}
							rounded="lg"
							css={{
								"--start-color": "colors.gray.50",
								"--end-color": "colors.gray.200",
							}}
							variant="shine"
						/>
					) : (
						<Box>
							<Text fontFamily="greg" fontSize="2xl" maxW="xl" lineHeight="30px" color="black">
								{isData?.title}
							</Text>
							<Text fontFamily="glight" fontSize="md" color="black" mb={2}>
								{isData?.description}
							</Text>
							<Flex flexWrap="wrap" align="center" direction="row" gapX={6} gapY={2} mt={4}>
								{/* tags */}
								<Stack direction="row" align="center">
									<Text fontFamily="gmid" fontSize="md" color="black">
										Tags:
									</Text>
									<Stack direction="row" align="center">
										{isData?.tags?.map((t: any, index: number) => (
											<Box key={index} bg="gray.100" rounded="full" px={3} py={1}>
												<Text fontFamily="greg" fontSize="md" textTransform="capitalize" opacity="0.7">
													{t}
												</Text>
											</Box>
										))}
									</Stack>
								</Stack>
								{/* brand */}
								<Stack direction="row" align="center">
									<Text fontFamily="gmid" fontSize="md" color="black">
										Brand:
									</Text>
									<Text fontFamily="greg" fontSize="md" color="black" opacity={0.7}>
										{isData?.brand}
									</Text>
								</Stack>
								{/* SKU */}
								<Stack direction="row" align="center">
									<Text fontFamily="gmid" fontSize="md" color="black">
										SKU:
									</Text>
									<Text fontFamily="greg" fontSize="md" color="black" opacity={0.7}>
										{isData?.sku}
									</Text>
								</Stack>
							</Flex>

							<Flex flexWrap="wrap" align="center" direction="row" gapX={6} mt={6} gapY={2}>
								<Text fontSize="3xl" fontFamily="greg" color="black">
									<Text as="span" textDecoration="line-through">
										N
									</Text>
									{(isData?.discountPercentage * 1600)?.toLocaleString("en-US")}
								</Text>

								<Icon
									as={favItems[0]?.favorite ? IoIosHeart : IoIosHeartEmpty}
									w={7}
									h={7}
									mt={-1}
									color={favItems[0]?.favorite ? "red" : "black"}
									onClick={() => handleToggleFavorite(isData?.id, isData?.title)}
									cursor="pointer"
								/>
								<Stack direction="row" align="center">
									<ReactStars count={5} size={20} color2={"#F97316"} edit={false} value={isData?.rating} />
									<Text fontFamily="greg" mt={1} opacity={0.5} color="black">
										({isData?.stock})
									</Text>
								</Stack>
								<Text fontFamily="greg" fontSize="md" color="black">
									Availability: {isData?.availabilityStatus}
								</Text>
								<Text fontFamily="greg" fontSize="md" color="black">
									Weight: {isData?.weight}
								</Text>
							</Flex>
						</Box>
					)}

					<Box h="2px" w="full" bg="gray.100" mb={6} mt={3} />
					<Flex gap={{ sm: 20 }} justify={{ base: "space-between", sm: "unset" }}>
						{/* sizes */}
						{!isData?.price ? (
							<Skeleton
								h={20}
								maxW={{ base: "140px", lg: "150px" }}
								w="full"
								rounded="lg"
								css={{
									"--start-color": "colors.gray.50",
									"--end-color": "colors.gray.200",
								}}
								variant="shine"
							/>
						) : (
							<Box>
								<Text fontFamily="glight" fontSize="md" color="black">
									Available sizes
								</Text>
								<Stack direction="row" align="center" maxW="xs" mt={3}>
									{sizes?.map((s: any, index: number) => (
										<Box
											rounded="lg"
											key={index}
											color={activeSize === s?.value ? "white" : "black"}
											bg={activeSize === s?.value ? "black" : "white"}
											onClick={() => handleActiveSize(s?.value)}
											borderWidth="2px"
											borderColor="gray.100"
											w={10}
											h={10}
											display="flex"
											flexDirection="column"
											justifyContent="center"
											alignItems="center"
											fontFamily="greg"
											cursor="pointer"
											transition="color, background-color ease-in 0.3s"
											_hover={{ bg: activeSize === s?.value ? "black" : "gray.100" }}
										>
											{s?.name}
										</Box>
									))}
								</Stack>
							</Box>
						)}

						{/* colors */}
						{!isData?.price ? (
							<Skeleton
								h={20}
								maxW={{ base: "140px", lg: "150px" }}
								w="full"
								rounded="lg"
								css={{
									"--start-color": "colors.gray.50",
									"--end-color": "colors.gray.200",
								}}
								variant="shine"
							/>
						) : (
							<Box>
								<Box>
									<Text fontFamily="glight" fontSize="md" color="black">
										Available colors
									</Text>
								</Box>
								<Stack direction="row" align="center" gap={2} mt={3}>
									{colors?.map((c: any, index: number) => (
										<Circle
											size="30px"
											bg="white"
											key={index}
											onClick={() => handleActiveColor(c?.value)}
											borderWidth={activeColor === c?.value ? "2px" : "0px"}
											borderColor={activeColor === c?.value ? "gray.400" : "transparent"}
											cursor="pointer"
											display="flex"
											flexDirection="column"
											justifyContent="center"
											alignItems="center"
										>
											<Circle size="14px" bg={c?.name} />
										</Circle>
									))}
								</Stack>
							</Box>
						)}
					</Flex>
					<Box h="2px" w="full" bg="gray.100" my={6} />
					<Box w="fit">
						{!isData?.price ? (
							<SkeletonText
								noOfLines={1}
								w="200px"
								h={5}
								rounded="md"
								css={{
									"--start-color": "colors.gray.50",
									"--end-color": "colors.gray.200",
								}}
								variant="shine"
							/>
						) : (
							<Text fontFamily="glight" fontSize="md" color="black">
								<Text as="span" fontFamily="gmid">
									Last 1 left{" "}
								</Text>
								- make it yours
							</Text>
						)}

						<Stack
							direction={{ base: "column", sm: "row" }}
							align={{ base: "start", sm: "center" }}
							gap={6}
							mt={4}
							// w="fit-content"
						>
							{!isData?.price ? (
								<SkeletonText
									noOfLines={1}
									minW={{ base: "full", lg: "200px" }}
									h={10}
									rounded="md"
									css={{
										"--start-color": "colors.gray.50",
										"--end-color": "colors.gray.200",
									}}
									variant="shine"
								/>
							) : (
								<Stack
									gap={6}
									direction="row"
									align="center"
									rounded="lg"
									borderWidth="2px"
									borderColor="gray.200"
									w="fit-content"
								>
									{/* counter */}

									<Box
										// onClick={() => handleDecrease(isData?.id)}
										onClick={decrease}
									>
										<Button
											bg="gray.50"
											py={2}
											px={3}
											_hover={{ bg: "black", color: "white" }}
											roundedLeft="lg"
											transition=" ease-in-out  0.3s"
											color="black"
											cursor="pointer"
											// disabled={items?.length === 0 || undefined}
											disabled={qty === 1}
										>
											<Icon as={FiMinus} w={6} h={6} fontFamily="greg" />
										</Button>
									</Box>
									<Text color="black" fontFamily="greg" fontSize="lg">
										{/* {items[0]?.quantity ? items[0]?.quantity : 0} */}
										{qty}
									</Text>
									<Box
										// onClick={() => handleIncrease(isData?.id)}
										onClick={increase}
									>
										<Button
											bg="gray.50"
											py={2}
											px={3}
											_hover={{ bg: "black", color: "white" }}
											color="black"
											roundedRight="lg"
											transition=" ease-in-out  0.3s"
											cursor="pointer"
											disabled={items[0]?.quantity === isData?.stock}
										>
											<Icon as={FiPlus} w={6} h={6} fontFamily="greg" />
										</Button>
									</Box>
								</Stack>
							)}

							{!isData?.price ? (
								<SkeletonText
									noOfLines={1}
									minW={{ base: "full", lg: "200px" }}
									h={10}
									rounded="md"
									css={{
										"--start-color": "colors.gray.50",
										"--end-color": "colors.gray.200",
									}}
									variant="shine"
								/>
							) : (
								<Stack direction="row" align="center" gap={4}>
									<Box onClick={() => handleAddToCart(isData, isData?.title)}>
										<Button
											fontFamily="glight"
											bg="black"
											color="white"
											variant="solid"
											fontSize="lg"
											px={10}
											py={7}
											_hover={{ bg: "#222222" }}
											transition="background-color ease-in-out 0.3s"
											rounded="xl"
										>
											Add to cart
										</Button>
									</Box>
								</Stack>
							)}
						</Stack>
						{!isData?.price ? (
							<SkeletonText
								noOfLines={1}
								minW={{ base: "full", lg: "200px" }}
								h={10}
								rounded="md"
								mt={6}
								css={{
									"--start-color": "colors.gray.50",
									"--end-color": "colors.gray.200",
								}}
								variant="shine"
							/>
						) : (
							<Box onClick={handleClearCart} cursor="pointer" w="full" mt={6}>
								<Button
									fontFamily="glight"
									bg="red"
									color="white"
									variant="solid"
									fontSize="lg"
									px={10}
									py={7}
									_hover={{ bg: "red.700" }}
									transition="background-color ease-in-out 0.3s"
									rounded="xl"
									w="full"
								>
									Clear cart
								</Button>
							</Box>
						)}
					</Box>
				</Box>
			</Flex>
			<Box mt={20} w="full">
				<Text fontFamily="greg" fontSize="2xl" maxW="xl" lineHeight="30px" color="black">
					Reviews
				</Text>
				<Stack mt={8}>
					{isData?.reviews?.map((r: any, index: number) => (
						<Box key={index}>
							<Stack direction="row" align="center">
								<Text fontFamily="gmid" fontSize="lg" mt={2}>
									{r?.reviewerName}
								</Text>
								<ReactStars count={5} size={20} color2={"#F97316"} edit={false} value={r?.rating} />
							</Stack>
							<Text fontFamily="glight" fontSize="sm" opacity={0.5}>
								{r?.reviewerEmail}
							</Text>
							<Text fontFamily="glight" fontSize="md" opacity={1} mt={4}>
								{r?.comment}
							</Text>

							<Box h="1px" bg="gray.100" w="full" />
						</Box>
					))}
				</Stack>
			</Box>
		</Box>
	);
};

export default ViewPage;
