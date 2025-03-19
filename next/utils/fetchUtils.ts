import { ICoingeckoCoinResponse } from "@/types/types";

export const getCoinsDataById = async (
	coins: string
): Promise<ICoingeckoCoinResponse[]> => {
	try {
		const resp = await fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}`
		);
		const data = await resp.json();
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
};