/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
const useGetProductByCat = () => {
	const [isData, setIsData] = useState<any>(null);
	const [loading, setLoading] = useState<any>(false);
	const getProdByCat = async (
		product?: string,
		limit: number = 20,
		skip: number = 0,
		sortby?: string,
		order?: string
	) => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${
					process.env.NEXT_PUBLIC_BASEURL
				}/products/category/${product}?limit=${limit}&skip=${skip}&select=title,price,images,rating,stock,category,discountPercentage&sortBy=${sortby}&order=${
					order ?? "asc"
				}`
			);
			setIsData(data);
			setLoading(false);
		} catch (err: any) {
			console.log(err);
			setLoading(false);
		}
	};
	return { getProdByCat, isData, loading };
};

export default useGetProductByCat;
