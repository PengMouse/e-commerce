/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
const useGetProduct = () => {
	const [isData, setData] = useState<any>(null);
	const getProduct = async (id: any) => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/products/${id}`);
			setData(data);
		} catch (err: any) {
			console.log(err);
		}
	};
	return { getProduct, isData };
};

export default useGetProduct;
