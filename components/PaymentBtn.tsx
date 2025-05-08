/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { Toaster, toaster } from "./ui/toaster";
import { useSelector } from "react-redux";
const PaymentBtn = ({ amount }: any) => {
	const [Paystack, setPaystack] = useState<any>(null);
	const { items } = useSelector((state: any) => state?.cart);
	console.log(items);
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

	const handlePay = () => {
		if (items?.length <= 0) {
			handleNotification("info", "Cart's empty", "Add more items to cart");
			return;
		}

		if (!Paystack) return;

		const paystack = new Paystack();

		paystack.newTransaction({
			key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_TEST_KEY!,
			email: "tundejoseph294@gmail.com",
			amount: amount * 100, // Convert to kobo if using NGN
			currency: "NGN",
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
			},
			onSuccess: (transaction: any) => {
				alert(`Success! Reference: ${transaction.reference}`);
			},
			onCancel: () => {
				alert("Transaction cancelled");
			},
			onError: (error: any) => {
				alert(`Error: ${error.message}`);
			},
		});
	};

	return (
		<>
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
