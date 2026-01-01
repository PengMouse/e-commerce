/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { Toaster, toaster } from "./ui/toaster";
import { useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "@chakra-ui/react";
interface PaymentProps {
	amount: number;
	name: string;
	email: string;
	phone: number | any;
	address: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
}

const PaymentBtn = ({
	amount,
	name,
	email,
	phone,
	address,
	city,
	state,
	postal_code,
	country,
}: PaymentProps) => {
	const [Paystack, setPaystack] = useState<any>(null);
	const { items } = useSelector((state: any) => state?.cart);
	const { userData } = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const [fraudDetectID, setFraudDetectTransID] = useState("");
	const [loading, setLoading] = useState(false);

	const handleNotification = (status: any, title: any, description: any) => {
		toaster.create({
			title: `${title}`,
			description: `${description}`,
			type: `${status}`,
			duration: 3000,
		});
	};
	useEffect(() => {
		// Dynamically import only on client side
		import("@paystack/inline-js").then((module) => {
			setPaystack(() => module.default);
		});
	}, []);

	const reqBody = {
		transaction_id: "",
		email: email ?? userData?.email,
		amount: amount,
		timestamp: new Date().toISOString().split(".")[0],
		items: items?.map((item: any) => ({
			id: item?.id,
			name: item?.title,
			price: item?.price,
			quantity: item?.quantity,
			category: item?.category,
			rating: item?.rating,
		})),
	};

	const handlePay = async () => {
		if (items?.length <= 0) {
			handleNotification("info", "Cart's empty", "Add more items to cart");
			return;
		}

		if (!name || !email || !phone || !address || !city || !state || !postal_code || !country) {
			handleNotification("error", "Incomplete details", "Please fill in your shipping details");
			return;
		}

		if (!Paystack) return;

		setLoading(true);
		setFraudDetectTransID("");

		try {
			const { data } = await axios.post("https://fraud-api-bejd.onrender.com/predict", reqBody);
			console.log(data);
			setLoading(false);
			setFraudDetectTransID(data?.transaction_id);

			if (data?.status === "success" && data?.decision === "ALLOW" && data?.is_fraud === false) {
				const paystack = new Paystack();

				paystack.newTransaction({
					key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_TEST_KEY!,
					email: email ?? userData?.email,
					amount: amount * 100, // Convert to kobo if using NGN
					currency: "NGN",
					first_name: name ?? userData?.displayName,
					metadata: {
						custom_fields: items.map((item: any, index: number) => ({
							display_name: `Product ${index + 1}`,
							variable_name: `product_${index + 1}`,
							value: `ID: ${item.id}, Name: ${item.title}, Price: ${item.price}, Qty: ${
								item.quantity
							}, Size:${item?.size ? item?.size : "-"}, Category:${
								item?.category ? item?.category : "-"
							}, Color:${item?.color ? item?.color : "-"}`,
						})),
						customer_name: name ?? userData?.displayName,
						customer_phoneNumber: phone ?? userData?.phoneNumber,
						shipping_address: {
							address,
							city,
							state,
							postal_code,
							country,
						},
						fraud_detection_id: fraudDetectID,
					},
					onSuccess: async (transaction: any) => {
						setLoading(true);
						try {
							const { data } = await axios.get(`/api/verify?reference=${transaction.reference}`);
							console.log(data);
							if (data?.message === "Payment verified") {
								alert(`Success! Reference: ${transaction.reference}`);
								dispatch(clearCart());
								setLoading(false);
							}
						} catch (err) {
							console.log(err);
							setLoading(false);
						}
					},
					onCancel: () => {
						alert("Transaction cancelled");
						setLoading(false);
					},
					onError: (error: any) => {
						alert(`Error: ${error.message}`);
						setLoading(false);
					},
				});
			}
		} catch (err: any) {
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<>
			{loading && (
				<Box
					pos="fixed"
					inset={0}
					w="full"
					minH="100vh"
					bg="rgba(0,0,0,0.9)"
					display="flex"
					justifyContent="center"
					alignItems="center"
					zIndex={9999}
				>
					<Spinner color="white" size="lg" />
				</Box>
			)}

			<Toaster />
			<Button
				fontFamily="glight"
				bg="black"
				color="white"
				variant="solid"
				fontSize="lg"
				px={8}
				py={7}
				_hover={{ bg: "#333333" }}
				transition="background-color ease-in-out 0.3s"
				rounded="xl"
				onClick={handlePay}
			>
				🤑 Checkout
			</Button>
		</>
	);
};

export default PaymentBtn;
