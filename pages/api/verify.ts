import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { reference } = req.query;

	if (!reference || typeof reference !== "string") {
		return res.status(400).json({ message: "Transaction reference is required" });
	}

	try {
		const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PAYSTACK_SECRET_TEST_KEY}`,
			},
		});

		const data = await response.json();

		if (!data.status || data.data.status !== "success") {
			return res.status(400).json({
				message: "Payment not successful",
				data,
			});
		}

		// ✅ Optional: extra security checks
		// const amountPaid = data.data.amount / 100;
		// const email = data.data.customer.email;
		// const metadata = data.data.metadata;

		return res.status(200).json({
			message: "Payment verified",
			data: data.data,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Verification failed",
			error,
		});
	}
}
