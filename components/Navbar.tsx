import { Box, Circle, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
const Navbar = () => {
	return (
		<Box p={6} bg="gray.50">
			<Box maxW="1360px" w="full" mx="auto" px={{ base: 6, lg: 10 }}>
				<Box ml="auto" w="fit" pos="relative">
					<Icon as={IoBagOutline} w={8} h={8} />
					<Circle
						size="20px"
						bg="red.200"
						pos="absolute"
						top={-1}
						right={-2}
						display="flex"
						flexDir="column"
						justifyContent="center"
						alignItems="center"
						rounded="full"
						fontFamily="greg"
						p={3}
					>
						<Text mt="3px">0</Text>
					</Circle>
				</Box>
			</Box>
		</Box>
	);
};

export default Navbar;
