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
const ViewPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { getProduct, isData } = useGetProduct();

	const sizes = [
		{ name: "S", value: "s" },
		{ name: "M", value: "m" },
		{ name: "L", value: "l" },
	];

	const colors = [
		{ name: "#d30000", value: "red" },
		{ name: "#000000", value: "black" },
		{ name: "#130066", value: "blue" },
	];

	const [activeSize, setActiveSize] = useState<any>(0);
	const [activeColor, setActiveColor] = useState<any>(0);
	const [qty, setQty] = useState<any>(1);

	const handleActiveSize = (id: any) => {
		setActiveSize(id);
	};
	const handleActiveColor = (id: any) => {
		setActiveColor(id);
	};

	const handleIncrease = () => {
		setQty(qty + 1);
	};
	const handleDecrease = () => {
		setQty(qty - 1);
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
		console.log(isData);
	}, [isData]);

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
			py={{ base: 10, lg: 20 }}
		>
			<Stack direction="row" align="center" mb={10} onClick={() => router.back()} cursor="pointer">
				<Icon as={CgArrowLeft} color="black" w={7} h={7} mt="1px" />
				<Box fontFamily="greg" color="black" fontSize="xl">
					Back
				</Box>
			</Stack>
			<Flex gap={8} w="full" direction={{ base: "column", md: "row" }}>
				{!isData?.image ? (
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
						<Image src={isData?.image} alt="" w="full" h="300px" objectFit="contain" />
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
							<Stack direction="row" align="center">
								<ReactStars
									count={5}
									size={20}
									color2={"#F97316"}
									edit={false}
									value={isData?.rating?.rate}
								/>
								<Text fontFamily="greg" mt={1} opacity={0.5} color="black">
									({isData?.rating?.rate})
								</Text>
							</Stack>
							<Text fontSize="3xl" fontFamily="greg" color="black" mt={6}>
								${isData?.price}
							</Text>
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
											color={activeSize === index ? "white" : "black"}
											bg={activeSize === index ? "black" : "white"}
											onClick={() => handleActiveSize(index)}
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
											_hover={{ bg: activeSize === index ? "black" : "gray.100" }}
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
											onClick={() => handleActiveColor(index)}
											borderWidth={activeColor === index ? "2px" : "0px"}
											borderColor={activeColor === index ? "gray.400" : "transparent"}
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
					<Box>
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

									<Box onClick={handleDecrease}>
										<Button
											bg="gray.50"
											py={2}
											px={3}
											_hover={{ bg: "black", color: "white" }}
											roundedLeft="lg"
											transition=" ease-in-out  0.3s"
											color="black"
											cursor="pointer"
											disabled={qty === 1}
										>
											<Icon as={FiMinus} w={6} h={6} fontFamily="greg" />
										</Button>
									</Box>
									<Text color="black" fontFamily="greg" fontSize="lg">
										{qty}
									</Text>
									<Box onClick={handleIncrease}>
										<Button
											bg="gray.50"
											py={2}
											px={3}
											_hover={{ bg: "black", color: "white" }}
											color="black"
											roundedRight="lg"
											transition=" ease-in-out  0.3s"
											cursor="pointer"
											disabled={qty === isData?.rating?.count}
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
									rounded="2xl"
								>
									Add to cart
								</Button>
							)}
						</Stack>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default ViewPage;
