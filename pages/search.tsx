/* eslint-disable react/no-unescaped-entities */
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
import { useRouter } from "next/router";
import ProdCard from "@/components/ProdCard";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { toggleFavorite } from "@/store/favoriteSlice";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Menu } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import { Pagination } from "@chakra-ui/react";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaSort } from "react-icons/fa";
import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";
import useSearchProduct from "@/components/hooks/searchProduct";

const Search = () => {
	const { isData: searchData, searchProduct, loading } = useSearchProduct();
	const router = useRouter();

	const { q } = router.query;

	const dispatch = useDispatch();

	const { favItems } = useSelector((state: any) => state.favorite);

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

	const total = searchData?.total;

	useEffect(() => {
		const getProdByQuery = async () => {
			await searchProduct(q, 20, skip, sortValue, orderValue);
		};
		getProdByQuery();
	}, [q, skip, page, sortValue, orderValue]);

	useEffect(() => {
		console.log(searchData);
	}, [searchData]);

	return (
		<Box maxW="1360px" w="full" mx="auto" px={{ base: 3, sm: 6, lg: 10 }} py={{ base: 10 }}>
			<Toaster />
			<Flex
				align={{ base: "start", sm: "center" }}
				justify={{ sm: "space-between" }}
				direction={{ base: "column", sm: "row" }}
				gap={4}
			>
				<Text fontFamily="greg" fontSize="xl">
					Search results for "{q}"
				</Text>
				<Stack direction="row" align="center" gap={4}>
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
							>
								<Stack direction="row" align="center">
									<Icon as={TiSortAlphabeticallyOutline} w={6} h={6} color="black" />
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
							>
								<Stack direction="row" align="center">
									<Icon as={FaSort} w={5} h={5} color="black" />

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
				</Stack>
			</Flex>
			<Box h="1px" bg="gray.300" w="full" mb={10} mt={1} />
			{/* search data */}
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
					: searchData?.products?.map((i: any, index: number) => (
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

			{searchData?.products?.length === 0 && !loading && (
				<Text fontSize="xl" fontFamily="greg" color="black" mx="auto" w="fit" opacity={0.6}>
					Searched keyword returned no item
				</Text>
			)}

			{/* Pagination */}
			{searchData?.products?.length !== 0 && (
				<Pagination.Root
					count={searchData?.total}
					pageSize={20}
					defaultPage={page}
					mt={20}
					ml="auto"
					w="fit"
				>
					<ButtonGroup variant="solid" size="lg">
						<Pagination.PrevTrigger asChild>
							<IconButton onClick={handleReducePagination} disabled={loading || skip === 0}>
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
							<IconButton
								onClick={handleIncreasePagination}
								disabled={loading || total === searchData?.total}
							>
								<LuChevronRight />
							</IconButton>
						</Pagination.NextTrigger>
					</ButtonGroup>
				</Pagination.Root>
			)}
		</Box>
	);
};

export default Search;
