/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
const Layout = ({ children }: any) => {
	return (
		<>
			<Navbar />
			<Box pb={24}>{children}</Box>
		</>
	);
};

export default Layout;
