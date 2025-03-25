/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
const useGetProducts = () => {
	const [isData, setIsData] = useState<any>(null);
	const getProds = async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/products`);
			setIsData(data);
		} catch (err: any) {
			console.log(err);
		}
	};
	return { getProds, isData };
};

export default useGetProducts;
