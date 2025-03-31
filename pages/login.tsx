/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input, Stack, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useLogUserIn from "@/components/hooks/logUserIn";
import { Toaster, toaster } from "@/components/ui/toaster";

const Login = () => {
	const { getLogIn, isData, states } = useLogUserIn();
	const [values, setValues] = useState<any>({
		username: "emilys",
		pwd: "emilyspass",
		expiresInMins: 1500,
	});

	const handleValueChange = (e: any) => {
		const { name, value } = e?.target;
		setValues((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		getLogIn(values?.username, values?.pwd);
	};

	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 3000,
		});
	};

	useEffect(() => {
		if (states?.success) {
			setTimeout(() => {
				handleNotification("success", states?.successMsg, "");
			}, 0);
		} else if (states?.error) {
			setTimeout(() => {
				handleNotification("error", states?.errorMsg, "");
			}, 0);
		}
	}, [states]);

	return (
		<Box
			minH="100vh"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			w="full"
		>
			<Toaster />
			<Stack maxW="sm" w="full">
				<Text fontSize="3xl" fontFamily="greg" color="black" textAlign="center" mx="auto" w="fit">
					Login
				</Text>
				<form onSubmit={handleSubmit} style={{ width: "full" }}>
					<Stack
						gap={3}
						w="full"
						maxW="sm"
						bg="gray.50"
						rounded="xl"
						px={6}
						py={6}
						minH="200px"
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
					>
						<Input
							name="username"
							id="username"
							value={values.username}
							type="text"
							onChange={handleValueChange}
							placeholder="Username"
							w="full"
							fontFamily="greg"
							color="black"
							fontSize="md"
							borderColor="gray.400"
							disabled={states?.loading}
							_autofill={{
								boxShadow: `0 0 0px 1000px #B2BAC8 inset`,
								WebkitTextFillColor: "black",
							}}
						/>

						<Input
							name="pwd"
							id="pwd"
							value={values.pwd}
							type="password"
							onChange={handleValueChange}
							placeholder="Password"
							w="full"
							fontFamily="greg"
							color="black"
							fontSize="md"
							borderColor="gray.400"
							disabled={states?.loading}
							_autofill={{
								boxShadow: `0 0 0px 1000px #B2BAC8 inset`,
								WebkitTextFillColor: "black",
							}}
						/>
						<Button
							mt={4}
							type="submit"
							fontFamily="glight"
							bg="black"
							color="white"
							variant="solid"
							fontSize="lg"
							px={10}
							py={6}
							_hover={{ bg: "#222222" }}
							transition="background-color ease-in-out 0.3s"
							rounded="xl"
							w="full"
							loading={states?.loading}
							loadingText="Please wait..."
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Stack>
		</Box>
	);
};

export default Login;
