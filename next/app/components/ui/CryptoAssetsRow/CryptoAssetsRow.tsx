"use client";

import { useState } from "react";
import Image from "next/image";
import copyImage from "@/public/icons/another/copy.svg";

interface ICryptoAssetsRow {
	iconUrl?: string;
	name: string;
	amount: number;
	networkName: string;
	onClick?: () => void;
	address?: string;
	price: number;
}

// TODO:
// make better semantic

const CryptoAssetsRow: React.FC<ICryptoAssetsRow> = ({
	iconUrl,
	name,
	amount,
	networkName,
	onClick,
	address,
	price,
}) => {
	const [isCoppied, setIsCoppied] = useState<boolean>(false);

	const copyAddress = (e: React.SyntheticEvent) => {
		e.stopPropagation();
		console.log("coppied" + " " + address);
		if (address) {
			navigator.clipboard.writeText(address);
		}
		setIsCoppied(true);
	};

	return (
		<div
			onClick={onClick}
			className="group flex justify-between items-center w-full px-2 py-1 border-b border-background-border cursor-pointer"
		>
			<div className="inline-block flex items-center">
				{iconUrl ? (
					<Image
						src={iconUrl}
						alt={networkName}
						width={40}
						height={40}
						className="inline-block"
					/>
				) : (
					<span
						aria-label="no icon available"
						className="w-5 h-5 bg-black inline-block rounded-full"
					/>
				)}
				<div>
					<div className="felx relative text-[12px] md:text-[14px]">
						<span className="mx-1 md:mx-2">{name}</span>
						<span className="bg-background-component p-1 rounded-xl">
							{networkName}
						</span>
						{address && (
							<div
								onClick={copyAddress}
								className="group/two md:hidden md:group-hover:inline-block ml-2 absolute -right-5 top-1"
								onMouseLeave={() => setIsCoppied(false)}
							>
								<Image src={copyImage} alt="copy icon" className="w-4 h-4" />
								<span className="absolute hidden group-hover/two:inline-block left-0 top-full bg-background-component p-1 rounded-md text-[14px]">
									{isCoppied ? "coppied" : "copy"}
								</span>
							</div>
						)}
					</div>
					<div className="pl-1 md:pl-2 opacity-80">{price.toFixed(2)}</div>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<div>{amount}</div>
				<div className="opacity-80">{(amount * price).toFixed(2)} $</div>
			</div>
		</div>
	);
};

export default CryptoAssetsRow;
