/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProdCard from "./ProdCard";
import useGetProducts from "./hooks/getProducts";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/favoriteSlice";
import { Toaster, toaster } from "@/components/ui/toaster";
import { addItem } from "@/store/cartSlice";
const Products = () => {
	const { getProds, isData } = useGetProducts();
	const { favItems } = useSelector((state: any) => state.favorite);
	const dispatch = useDispatch();

	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 3000,
		});
	};

	const handleAddtoFavorite = (id: any, name: any) => {
		const isFavorite = favItems.some((item: any) => item.id === id);
		if (!isFavorite) {
			handleNotification("info", "❤️ Item added to favorite", name);
		} else if (isFavorite) {
			handleNotification("info", "😏 Item removed from favorite", name);
		}
	};

	const handleAddToCart = (name: any, data: any) => {
		dispatch(addItem(data));
		handleNotification("info", "🤑 Item added to cart", name);
	};

	useEffect(() => {
		const getProd = async () => {
			await getProds();
		};
		getProd();
	}, []);

	return (
		<Box maxW="1360px" w="full" mx="auto" px={{ base: 3, sm: 6, lg: 10 }} py={{ base: 10, lg: 20 }}>
			<Toaster />
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
									minW={{ base: "50px", sm: "200px" }}
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
									id={i?.id}
									data={i}
									favFunc={() => {
										handleAddtoFavorite(i.id, i?.title);
										dispatch(toggleFavorite(i));
									}}
									cartFunc={() => handleAddToCart(i?.title, i)}
									toggle={favItems.some((item: any) => item.id === i?.id)}
								/>
							</Box>
					  ))}
			</SimpleGrid>
		</Box>
	);
};

export default Products;
