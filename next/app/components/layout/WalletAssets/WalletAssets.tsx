"use client";

import { networks } from "@/config/cryptoNetworks";
import CryptoAssetsRow from "../../ui/CryptoAssetsRow/CryptoAssetsRow";
import { useQuery } from "@tanstack/react-query";
import {
	INetwork,
	ICoingeckoCoinResponse,
	INetworkAndGeckoResponse,
} from "@/types/types";
import { getCoinsDataById } from "@/utils/fetchUtils";
import { getCoinsIdsFromArr } from "@/utils/helpersUtils";

// add saving images urls to local storage functionality
// play with caching and refetching 

const WalletAssets = () => {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["coinsData"],
		queryFn: () => getCoinsDataById(getCoinsIdsFromArr(networks)),
		select: (data) =>
			networks.flatMap((n: INetwork) => {
				const coinData = data?.find(
					(d: ICoingeckoCoinResponse) => n.coingeckoId === d.id
				);
				return {
					...n,
					...(coinData || {}),
				};
			}),
	});

  if (isError) return (<div>Error fetching data...</div>)
  if (isLoading) return (<div>Loading...</div>)

	return (
		<div>
			{data?.map((n: INetworkAndGeckoResponse, i: number) => (
				<CryptoAssetsRow
					key={i}
					iconUrl={n.image}
					name={n.symbol}
					networkName={n.networkName}
					amount={10}
					address={"safsdjlfj4j3oj"}
					price={n.current_price}
				/>
			))}
		</div>
	);
};

export default WalletAssets;
