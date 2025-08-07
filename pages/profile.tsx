/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
	const { userData } = useSelector((state: any) => state?.user);
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			minH="50vh"
		>
			<Avatar.Root shape="full" size="2xl">
				<Avatar.Fallback name={userData?.displayName} />
				<Avatar.Image src={userData?.photoURL} />
			</Avatar.Root>
			<Text textTransform="capitalize" fontSize="xl" fontWeight="semibold">
				Name: {userData?.displayName}
			</Text>
			<Text fontSize="xl" fontWeight="semibold">
				Email: {userData?.email}
			</Text>
			<Text fontSize="xl" fontWeight="semibold">
				ID: {userData?.uid}
			</Text>
		</Box>
	);
};

export default Profile;
