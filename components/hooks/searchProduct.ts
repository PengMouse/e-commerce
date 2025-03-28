/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
const useSearchProduct = () => {
	const [isData, setIsData] = useState<any>(null);
	const [loading, setLoading] = useState<any>(false);
	const searchProduct = async (
		query?: any,
		limit: number = 20,
		skip: number = 0,
		sortby?: string,
		order?: string
	) => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_BASEURL}/products/search?q=${
					query ?? ""
				}&limit=${limit}&skip=${skip}&select=title,price,images,rating,stock,discountPercentage&sortBy=${sortby}&order=${
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
	return { searchProduct, isData, loading };
};
export default useSearchProduct;
