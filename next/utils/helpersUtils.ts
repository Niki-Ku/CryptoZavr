import { INetwork } from "@/types/types";

export const getCoinsIdsFromArr = (arr: INetwork[]): string => {
	return arr.map((a: INetwork) => a.coingeckoId).join(",");
};
