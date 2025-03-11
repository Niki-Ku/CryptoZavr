"use client";

import { JsonRpcProvider, ethers } from "ethers";
import { useEffect, useState } from "react";
import { ICoingeckoCoinResponse } from "@/types/types";
import Image from "next/image";
import { setToLocalStorage, getFromLocalStorage } from "@/utils/storageUtils";

interface ICryptoAssetsRow {
	icon: string;
	name: string;
	amount: number;
	networkName: string;
	onClick?: () => void;
	networkUrl: string;
	address?: string;
}

// TODO:
// display icons instead of text
// make better semantic
// remove unnecessary props 
// save to local storage array instead of every single image separately

const getCoinDataById = async (
	coinId: string
): Promise<ICoingeckoCoinResponse | null> => {
	try {
		const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const CryptoAssetsRow: React.FC<ICryptoAssetsRow> = ({
	icon,
	name,
	amount,
	networkName,
	onClick,
	address,
	networkUrl,
}) => {
	const [isCoppied, setIsCoppied] = useState<boolean>(false);
	const provider = new JsonRpcProvider(networkUrl);
	const [network, setNetwork] = useState();
	const [coinImg, setCoinImg] = useState<string>();
	// const network = await provider.getNetwork();

	const copyAddress = (e: React.SyntheticEvent) => {
		e.stopPropagation();
		console.log("coppied" + " " + address);
		if (address) {
			navigator.clipboard.writeText(address);
		}
		setIsCoppied(true);
	};

	useEffect(() => {
		// localStorage.clear()
		const getImages = async () => {
			const coinDataRes = await getCoinDataById(icon);
			// console.log(coinDataRes);
			const img = coinDataRes?.image?.small;
			if (img) {
				const icons = getFromLocalStorage("icons");
				console.log(icons);
				if (!icons) {
					console.log(icons, "here")
					setToLocalStorage("icons", [])
				}
				// console.log(img);
				icons.push(img);
				setCoinImg(img);
				setToLocalStorage("icons", [... new Set(icons)]);
			}
		};

		if (!coinImg) {
			const img = getFromLocalStorage("icons")?.filter((i: string) => i.includes(icon));
			// const img = getFromLocalStorage("icons");
			console.log(img)
			if (img.length < 1) getImages();
			else setCoinImg(img[0]);
		}
	}, [coinImg, icon]);

	return (
		<div
			onClick={onClick}
			className="group flex justify-between items-center w-full px-2 py-1 border-b border-background-border cursor-pointer"
		>
			<div className="inline-block flex items-center">
				{coinImg ? (
					<Image
						src={coinImg}
						alt={icon}
						width={20}
						height={20}
						className="inline-block"
					/>
				) : (
					<span aria-label="no icon available" className="w-5 h-5 bg-black inline-block rounded-full" />
				)}
				<span className="mx-2">{name}</span>
				<span className="bg-background-component p-1 rounded-xl text-[10px]">
					{network}
				</span>
				{address && (
					<div
						onClick={copyAddress}
						className="group/two hidden group-hover:inline-block ml-2 relative"
						onMouseLeave={() => setIsCoppied(false)}
					>
						{/* replace with icon */}
						Copy
						<span className="absolute hidden group-hover/two:inline-block left-0 top-full bg-background-component p-1 rounded-md text-[12px]">
							{isCoppied ? "coppied" : "copy"}
						</span>
					</div>
				)}
			</div>
			<span>{amount}</span>
		</div>
	);
};

export default CryptoAssetsRow;
