/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProdCard from "./ProdCard";
import useGetProducts from "./hooks/getProducts";
const Products = () => {
	const { getProds, isData } = useGetProducts();

	useEffect(() => {
		const getProd = async () => {
			await getProds();
		};
		getProd();
	}, []);

	useEffect(() => {
		console.log(isData);
	}, [isData]);

	return (
		<Box maxW="1360px" w="full" mx="auto" px={{ base: 3, sm: 6, lg: 10 }} py={{ base: 10, lg: 20 }}>
			<Text fontSize="4xl" fontFamily="greg" mb={6}>
				Products
			</Text>
			<SimpleGrid columns={{ base: 2, lg: 3, xl: 4 }} gap={{ base: 2, sm: 4 }} w="full">
				{!isData
					? Array(12)
							.fill("")
							.map((_: any, index: number) => (
								// <Skeleton key={index} minW="200px" h="250px" startColor="pink.500" endColor="orange.500" />
								<Skeleton
									rounded="2xl"
									variant="shine"
									minW="200px"
									height="250px"
									css={{
										"--start-color": "colors.gray.50",
										"--end-color": "colors.gray.200",
									}}
									key={index}
								/>
							))
					: isData?.map((i: any, index: number) => (
							<Box
								key={index}
								w="full"
								_focus={{
									focusRingWidth: 0,
								}}
							>
								<ProdCard
									img={i?.image}
									rating={i?.rating?.rate}
									name={i?.title}
									quantity={i?.rating?.count}
									price={i?.price}
									link={`/${i?.title}/${i?.id}`}
								/>
							</Box>
					  ))}
			</SimpleGrid>
		</Box>
	);
};

export default Products;
