"use client";

import { useState } from "react";

interface ICryptoAssetsRow {
	icon: string;
	name: string;
	amount: number;
	network: string;
	onClick: () => void;
	address?: string;
}

// TODO:
// display icons instead of text
// make better semantic

const CryptoAssetsRow: React.FC<ICryptoAssetsRow> = ({
	icon,
	name,
	amount,
	network,
	onClick,
	address,
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
			<div className="inline-block">
				<span>{icon}</span>
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
