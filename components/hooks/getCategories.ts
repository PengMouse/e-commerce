/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
const useGetCategories = () => {
	const [isData, setIsData] = useState<any>(null);
	const getCategories = async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/products/category-list`);
			setIsData(data);
		} catch (err: any) {
			console.log(err);
		}
	};
	return { getCategories, isData };
};

export default useGetCategories;
