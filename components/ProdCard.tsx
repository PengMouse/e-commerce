/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Circle, Icon, Image, Stack, Text, Flex, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ReactStars from "react-stars";
const ProdCard = ({ img, name, rating, quantity, price, link }: any) => {
	const [like, setLike] = useState<any>(false);
	const handleLike = () => {
		setLike(!like);
	};
	return (
		<Box
			// _hover={{ rounded: "2xl", boxShadow: "0px 4px 6px rgb(226, 226, 226)" }}
			// p={4}
			// transition="ease-in-out 0.4s"
			cursor="pointer"
			w="full"
		>
			<Box
				w="full"
				borderWidth="2px"
				rounded="2xl"
				overflow="hidden"
				borderColor="gray.100"
				pos="relative"
			>
				<Stack pos="absolute" top={4} right={4} gap={3}>
					<Circle bg="gray.100" size="20px" p="18px" onClick={handleLike}>
						<Icon as={like ? IoIosHeart : IoIosHeartEmpty} w={6} h={6} color={like ? "red" : "#333333"} />
					</Circle>
					<Circle bg="gray.100" size="20px" p="18px">
						<Icon as={IoCartOutline} w={6} h={6} color="#333333" />
					</Circle>
				</Stack>
				<Link
					href={link}
					w="full"
					_focus={{
						focusRingWidth: 0,
					}}
					_hover={{ textDecoration: "none" }}
				>
					<Box
						bg="white"
						p={3}
						h="250px"
						w="full"
						justifyContent="center"
						alignItems="center"
						display="flex"
						flexDirection="column"
					>
						<Box maxW="150px" w="full" mx="auto">
							<Image src={img} w="full" objectFit="contain" alt="" h="150px" />
						</Box>
					</Box>
				</Link>
			</Box>
			<Link
				href={link}
				w="full"
				_focus={{
					focusRingWidth: 0,
				}}
				_hover={{ textDecoration: "none" }}
			>
				<Box>
					<Text fontFamily="greg" fontSize="lg" lineClamp={1} mt={3} color="black">
						{name}
					</Text>
					<Flex
						gap={2}
						align={{ base: "start", sm: "center" }}
						direction={{ base: "column", sm: "row" }}
					>
						<Stack direction={{ base: "column", sm: "row" }} align={{ base: "start", sm: "center" }}>
							<ReactStars count={5} size={20} color2={"#F97316"} edit={false} value={rating} />
							<Text fontFamily="greg" fontSize="md" mt={{ sm: 1 }} color="black">
								{rating}{" "}
								<Text fontFamily="greg" fontSize="md" opacity={0.5} mt={{ sm: 1 }} color="black" as="span">
									({quantity})
								</Text>
							</Text>
						</Stack>
					</Flex>
					<Text fontSize="2xl" fontFamily="gmid" mt={{ base: 2 }} color="black">
						${price}
					</Text>
				</Box>
			</Link>
		</Box>
	);
};

export default ProdCard;
