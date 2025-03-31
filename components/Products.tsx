/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	SimpleGrid,
	Skeleton,
	Text,
	Flex,
	Stack,
	Icon,
	Button,
	Portal,
	ButtonGroup,
	IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProdCard from "./ProdCard";
import useGetProducts from "./hooks/getProducts";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/favoriteSlice";
import { Toaster, toaster } from "@/components/ui/toaster";
import { addItem } from "@/store/cartSlice";
import { VscSettings } from "react-icons/vsc";
import { Menu } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import { Pagination } from "@chakra-ui/react";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaSort } from "react-icons/fa";
import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";
import useGetCategories from "./hooks/getCategories";
import useGetProductByCat from "./hooks/getProductByCategory";
const Products = () => {
	const { getProds, isData, loading } = useGetProducts();
	const { getCategories, isData: catData } = useGetCategories();
	const { getProdByCat, isData: prodCatData, loading: prodcatLoading } = useGetProductByCat();

	const dispatch = useDispatch();

	const { favItems } = useSelector((state: any) => state.favorite);

	const [sortCatValue, setSortCatValue] = useState("");

	const [skip, setSkip] = useState<any>(0);

	const [page, setPage] = useState<any>(1);

	const [sortValue, setSortValue] = useState("");

	const [orderValue, setOrderValue] = useState("asc");

	const sortBy = [
		{ name: "title", id: 0, value: "title" },
		{ name: "price", id: 0, value: "price" },
		{ name: "rating", id: 0, value: "rating" },
		{ name: "stock", id: 0, value: "stock" },
		{ name: "discount", id: 0, value: "discountPercentage" },
	];

	const orderBy = [
		{ name: "ascending", id: 0, value: "asc", icon: LuArrowUpWideNarrow },
		{ name: "descending", id: 1, value: "desc", icon: LuArrowDownWideNarrow },
	];

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

	const handleCatSort = (value: any) => {
		setSortCatValue(value);
	};

	const handleAllProducts = () => {
		setSortCatValue("");
	};

	const handleIncreasePagination = () => {
		setSkip(skip + 20);
	};

	const handleReducePagination = () => {
		setSkip(skip - 20);
	};

	const handleCurrentPage = (id: any) => {
		setPage(id);
		setSkip(id === 0 ? 0 * id : 20 * id);
	};

	const handleSortClick = (value: any) => {
		setSortValue(value);
	};

	const handleOrderClick = (value: any) => {
		setOrderValue(value);
	};

	useEffect(() => {
		const getProd = async () => {
			await getProds(20, skip, sortValue, orderValue);
		};
		getProd();
	}, [skip, page, sortValue, orderValue]);

	useEffect(() => {
		const getProdCat = async () => {
			await getProdByCat(sortCatValue, 20, skip, sortValue, orderValue);
		};
		if (sortCatValue) {
			getProdCat();
		}
	}, [sortCatValue, skip, page, sortValue, orderValue]);

	useEffect(() => {
		const getCat = async () => {
			await getCategories();
		};
		getCat();
	}, []);

	return (
		<Box maxW="1360px" w="full" mx="auto" px={{ base: 3, sm: 6, lg: 10 }} py={{ base: 10, lg: 20 }}>
			<Toaster />
			<Flex
				align={{ base: "start", sm: "center" }}
				justify={{ sm: "space-between" }}
				direction={{ base: "column", sm: "row" }}
				gap={4}
			>
				<Text fontSize="3xl" fontFamily="greg">
					Products
				</Text>
				<Flex flexWrap="wrap" direction="row" align="center" gap={6}>
					<Menu.Root>
						<Menu.Trigger asChild>
							<Button
								variant="outline"
								size="sm"
								bg="transparent"
								borderWidth="0"
								borderColor="transparent"
								_focus={{
									focusRingWidth: 0,
								}}
								padding={0}
							>
								<Stack direction="row" align="center">
									<Icon as={VscSettings} w={5} h={5} color="black" />
									<Text fontSize="lg" fontFamily="greg" color="black">
										Filter by
									</Text>
								</Stack>
							</Button>
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>
									<Menu.Item
										value="new-txt"
										fontFamily="greg"
										onClick={handleAllProducts}
										mb={2}
										cursor="pointer"
									>
										All products
									</Menu.Item>

									{/* categories */}
									<Menu.Root positioning={{ placement: "right-start", gutter: 2 }} size="md">
										<Menu.TriggerItem fontFamily="greg" mb={2} cursor="pointer">
											Categories <LuChevronRight />
										</Menu.TriggerItem>
										<Portal>
											<Menu.Positioner>
												<Menu.Content maxH="300px" overflowY="auto">
													{catData?.map((c: any, index: number) => (
														<Menu.Item
															value={c}
															key={index}
															textTransform="capitalize"
															onClick={() => handleCatSort(c)}
															cursor="pointer"
														>
															{c}
														</Menu.Item>
													))}
												</Menu.Content>
											</Menu.Positioner>
										</Portal>
									</Menu.Root>
								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu.Root>

					{/* sort by */}
					<Menu.Root>
						<Menu.Trigger asChild>
							<Button
								variant="outline"
								size="sm"
								bg="transparent"
								borderWidth="0"
								borderColor="transparent"
								_focus={{
									focusRingWidth: 0,
								}}
								padding={0}
							>
								<Stack direction="row" align="center">
									<Icon as={TiSortAlphabeticallyOutline} w={6} h={6} color="black" mt={{ sm: -1 }} />
									<Text fontSize="lg" fontFamily="greg" color="black">
										Sort by
									</Text>
								</Stack>
							</Button>
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>
									{sortBy?.map((s: any, index: number) => (
										<Menu.Item
											value={s?.name}
											key={index}
											fontFamily="greg"
											mb={2}
											mt={index === 0 ? 2 : 0}
											textTransform="capitalize"
											cursor="pointer"
											onClick={() => handleSortClick(s?.value)}
										>
											{s?.name}
										</Menu.Item>
									))}
								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu.Root>

					{/* order by */}
					<Menu.Root>
						<Menu.Trigger asChild>
							<Button
								variant="outline"
								size="sm"
								bg="transparent"
								borderWidth="0"
								borderColor="transparent"
								_focus={{
									focusRingWidth: 0,
								}}
								padding={0}
							>
								<Stack direction="row" align="center">
									<Icon as={FaSort} w={5} h={5} color="black" mt={{ sm: -1 }} />

									<Text fontSize="lg" fontFamily="greg" color="black">
										Order by
									</Text>
								</Stack>
							</Button>
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content>
									{orderBy?.map((s: any, index: number) => (
										<Menu.Item
											value={s?.name}
											key={index}
											fontFamily="greg"
											mb={2}
											mt={index === 0 ? 2 : 0}
											textTransform="capitalize"
											cursor="pointer"
											onClick={() => handleOrderClick(s?.value)}
										>
											<Icon as={s?.icon} w={4} h={5} />
											{s?.name}
										</Menu.Item>
									))}
								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu.Root>
				</Flex>
			</Flex>
			<Box h="1px" bg="gray.300" w="full" mb={10} mt={1} />
			{/* all products */}
			{sortCatValue === "" && (
				<Box>
					<SimpleGrid
						columns={{ base: 2, lg: 3, xl: 4 }}
						gapX={{ base: 2, sm: 4 }}
						gapY={{ base: 4, sm: 8 }}
						w="full"
					>
						{loading
							? Array(12)
									.fill("")
									.map((_: any, index: number) => (
										// <Skeleton key={index} minW="200px" h="250px" startColor="pink.500" endColor="orange.500" />
										<Skeleton
											rounded="2xl"
											variant="shine"
											minW={{ base: "50px", sm: "200px" }}
											height="150px"
											css={{
												"--start-color": "colors.gray.50",
												"--end-color": "colors.gray.200",
											}}
											key={index}
										/>
									))
							: isData?.products?.map((i: any, index: number) => (
									<Box
										key={index}
										w="full"
										_focus={{
											focusRingWidth: 0,
										}}
									>
										<ProdCard
											img={i?.images[0]}
											rating={i?.rating}
											name={i?.title}
											quantity={i?.stock}
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
											discount={i?.discountPercentage}
										/>
									</Box>
							  ))}
					</SimpleGrid>
				</Box>
			)}

			{/* category data */}
			<SimpleGrid
				columns={{ base: 2, lg: 3, xl: 4 }}
				gapX={{ base: 2, sm: 4 }}
				gapY={{ base: 4, sm: 8 }}
				w="full"
			>
				{prodcatLoading
					? Array(12)
							.fill("")
							.map((_: any, index: number) => (
								<Skeleton
									rounded="2xl"
									variant="shine"
									minW={{ base: "50px", sm: "200px" }}
									height="150px"
									css={{
										"--start-color": "colors.gray.50",
										"--end-color": "colors.gray.200",
									}}
									key={index}
								/>
							))
					: prodCatData?.products?.map((i: any, index: number) => (
							<Box
								key={index}
								w="full"
								_focus={{
									focusRingWidth: 0,
								}}
							>
								<ProdCard
									img={i?.images[0]}
									rating={i?.rating}
									name={i?.title}
									quantity={i?.stock}
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
									discount={i?.discountPercentage}
								/>
							</Box>
					  ))}
			</SimpleGrid>

			{/* Pagination */}
			<Box>
				<Pagination.Root
					count={sortCatValue !== "" || undefined ? prodCatData?.total : isData?.total}
					pageSize={20}
					defaultPage={page}
					mt={20}
					ml="auto"
					w="fit"
				>
					<ButtonGroup variant="solid" size="lg">
						<Flex flexWrap="wrap">
							<Pagination.PrevTrigger asChild>
								<IconButton onClick={handleReducePagination} disabled={loading}>
									<LuChevronLeft />
								</IconButton>
							</Pagination.PrevTrigger>

							<Pagination.Items
								render={(page) => (
									<IconButton
										variant={{ base: "solid", _selected: "solid" }}
										_selected={{ borderWidth: "1px", borderColor: "black" }}
										disabled={loading}
										onClick={() => handleCurrentPage(page.value - 1)}
									>
										{page.value}
									</IconButton>
								)}
							/>

							<Pagination.NextTrigger asChild>
								<IconButton onClick={handleIncreasePagination} disabled={loading}>
									<LuChevronRight />
								</IconButton>
							</Pagination.NextTrigger>
						</Flex>
					</ButtonGroup>
				</Pagination.Root>
			</Box>
		</Box>
	);
};

export default Products;
