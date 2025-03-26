/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack, Icon, Text, SimpleGrid, Image, Flex } from "@chakra-ui/react";
import React from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import { CgArrowLeft } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "@/store/favoriteSlice";
const Favorite = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { favItems } = useSelector((state: any) => state.favorite);
	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 3000,
		});
	};

	const handleRemoveItem = (id: any) => {
		dispatch(removeFavorite(id));
		handleNotification("info", "😏 Item removed from favorite", "");
	};

	console.log(favItems);

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
					Favorites
				</Text>
			</Flex>
			<Box h="1px" bg="gray.300" minW="200px" w="full" my={6} />
			<SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} w="full" gap={6}>
				{favItems?.map((i: any, index: number) => (
					<Box key={index} w="full">
						<Box
							my={3}
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
										h={{ base: "100px", xl: "200px" }}
										mx="auto"
									>
										<Image
											src={i?.image}
											objectFit="contain"
											alt=""
											h={{ base: "100px", xl: "200px" }}
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
										<Stack direction="row" align="center" gap={6}>
											<Text
												fontFamily="glight"
												color="black"
												fontSize="md"
												maxW="xs"
												textTransform="capitalize"
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
											>
												<Text as="span" fontFamily="greg" opacity={0.6}>
													Color:{" "}
												</Text>
												{i?.color}
											</Text>
										</Stack>

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
										<Text
											fontFamily="glight"
											color="black"
											fontSize="md"
											lineClamp={1}
											maxW="xs"
											textTransform="capitalize"
										>
											<Text as="span" fontFamily="greg" opacity={0.6}>
												Quantity:
											</Text>{" "}
											{i?.quantity}
										</Text>
									</Stack>
									<Text fontFamily="gmid" color="black" fontSize="md">
										<Text as="span" fontFamily="greg" opacity={0.6}>
											Price:
											<br />
										</Text>{" "}
										${i?.price}
									</Text>
									<Stack w="fit-content" mt={6} direction="column" align="start" gap={1}>
										<Text
											color="red"
											fontFamily="glight"
											cursor="pointer"
											onClick={() => handleRemoveItem(i?.id)}
										>
											Remove from favorite
										</Text>
									</Stack>
								</Stack>
							</Flex>
						</Box>
					</Box>
				))}
			</SimpleGrid>
			{favItems?.length === 0 && (
				<Text
					color="#333333"
					fontFamily="greg"
					fontSize={{ base: "2xl", lg: "3xl" }}
					mx="auto"
					textAlign="center"
				>
					Your have no favorite item! 😒
				</Text>
			)}
		</Box>
	);
};

export default Favorite;
