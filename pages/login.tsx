/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input, Stack, Text, Button, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { FaGoogle } from "react-icons/fa";
// import { FaApple } from "react-icons/fa";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userDetails } from "@/store/userSlice";
import { storeUserAuthToken, storeUserRefreshToken } from "@/store/authSlice";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	// toast notification
	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 3000,
		});
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			const result: any = await signInWithPopup(auth, googleProvider);
			// console.log(result);
			dispatch(userDetails(result?.user?.providerData?.[0]));
			dispatch(storeUserAuthToken(result?._tokenResponse?.idToken));
			setCookie("authToken", result?._tokenResponse?.idToken, {
				maxAge: result?._tokenResponse?.oauthExpireIn,
				path: "/",
			});
			dispatch(storeUserRefreshToken(result?._tokenResponse?.refreshToken));
			if (result.user?.emailVerified === true) {
				handleNotification("success", "Login successful", "Welcome aboard");
			}
			setLoading(false);
			router.push("/");
		} catch (error: any) {
			console.error("Sign-in failed", error?.code);
			if (error?.code === "auth/popup-closed-by-user") {
				handleNotification("error", "Login failed!", "An error occured");
				setLoading(false);
			}
			setLoading(false);
		}
	};

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
				<Box px={{ base: 3, sm: 6, lg: 10 }}>
					<Stack gap={3} maxW="xl" mx="auto" w="full">
						{/* sign in with google */}
						<Button
							disabled={loading}
							w="full"
							rounded="xl"
							borderWidth="2px"
							borderColor="#111111"
							py={7}
							_hover={{ bg: "#111111", color: "white" }}
							color="#111111"
						>
							<Stack
								direction="row"
								align="center"
								w="full"
								gap={4}
								transition="all 0.3s ease-in-out"
								justify="center"
								onClick={handleGoogleLogin}
							>
								<Icon as={FaGoogle} boxSize={6} />
								<Text fontWeight="bold" fontSize="xl">
									SIGN IN WITH GOOGLE
								</Text>
							</Stack>
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default Login;
