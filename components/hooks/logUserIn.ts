/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeUserAuthToken, storeUserRefreshToken } from "@/store/authSlice";
import { userDetails } from "@/store/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useLogUserIn = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [isData, setIsData] = useState<any>(null);

	// console.log(`accessToken: ${authToken}`, `refreshToken:, ${refreshToken}`);

	const [states, setStates] = useState({
		loading: false,
		success: false,
		error: false,
		successMsg: "",
		errorMsg: "",
	});

	// Handle router completion
	useEffect(() => {
		const handleRouteChangeComplete = () => {
			setStates((prev: any) => ({ ...prev, loading: false }));
		};

		router.events.on("routeChangeComplete", handleRouteChangeComplete);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChangeComplete);
		};
	}, [router]);

	const getLogIn = async (username: any, password: any) => {
		setStates({
			success: false,
			error: false,
			successMsg: "",
			errorMsg: "",
			loading: true,
		});

		try {
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/auth/login`, {
				username,
				password,
			});

			dispatch(storeUserAuthToken(data?.accessToken));
			dispatch(storeUserRefreshToken(data?.refreshToken));

			try {
				const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/user/me`, {
					headers: {
						Authorization: `Bearer ${data?.accessToken}`,
					},
				});
				dispatch(userDetails(response));
			} catch (err) {
				console.error("Fetching user details failed:", err);
			}

			// Mark success and navigate
			setStates((prev: any) => ({
				...prev,
				success: true,
				successMsg: "Login successful",
			}));

			setTimeout(() => router.push("/"), 100);
		} catch (err: any) {
			console.log(err);
			setStates((prev: any) => ({
				...prev,
				loading: false,
				error: true,
				errorMsg: err?.response?.status === 400 ? "Invalid credentials" : "An error occurred",
			}));
		}
	};

	return { isData, getLogIn, states };
};

export default useLogUserIn;
