/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Circle, Icon, Image, Stack, Text, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ReactStars from "react-stars";
const ProdCard = ({
	img,
	name,
	rating,
	quantity,
	price,
	link,
	favFunc,
	cartFunc,
	toggle,
	discount,
}: any) => {
	return (
		<Box cursor="pointer" w="full">
			<Box
				w="full"
				borderWidth="2px"
				rounded="2xl"
				overflow="hidden"
				borderColor="gray.100"
				pos="relative"
			>
				<Stack pos="absolute" top={4} right={4} gap={3}>
					<Circle bg="gray.100" size="20px" p="18px" onClick={favFunc}>
						<Icon
							as={toggle ? IoIosHeart : IoIosHeartEmpty}
							w={6}
							h={6}
							color={toggle ? "red" : "#333333"}
						/>
					</Circle>
					<Circle bg="gray.100" size="20px" p="18px" onClick={cartFunc}>
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
				w={{ base: "fit-content", sm: "full" }}
				_focus={{
					focusRingWidth: 0,
				}}
				_hover={{ textDecoration: "none" }}
			>
				<Box w="fit-content">
					<Text
						fontFamily="greg"
						fontSize={{ base: "sm", sm: "md", lg: "lg" }}
						lineClamp={1}
						mt={3}
						color="black"
						w="fit-content"
					>
						{name}
					</Text>
					<Flex
						gap={2}
						align={{ base: "start", sm: "center" }}
						direction={{ base: "column", sm: "row" }}
						mt={-2}
						display={{ base: "none", sm: "flex" }}
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
					<Text
						fontSize={{ base: "2xl", sm: "3xl" }}
						fontFamily={{ base: "greg", lg: "gmid" }}
						color="black"
						w="fit-content"
					>
						<Text textDecoration="line-through" as="span">
							N
						</Text>
						{(discount * 1600).toLocaleString("en-US")}
					</Text>
					<Text
						fontSize="md"
						fontFamily="greg"
						color="red"
						w="fit-content"
						textDecoration="line-through"
						mt={-2}
					>
						<Text textDecoration="line-through" as="span">
							N
						</Text>
						{(price * 1600).toLocaleString("en-US")}
					</Text>
				</Box>
			</Link>
		</Box>
	);
};

export default ProdCard;
