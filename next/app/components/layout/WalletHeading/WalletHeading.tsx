"use client";
import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
// Define wallet type
interface IWalletHeading {
	wallets?: number[];
}
// add functions to add wallets

const WalletHeading: React.FC<IWalletHeading> = ({ wallets }) => {
	return (
		<div className="w-full">
			{wallets ? (
				<CustomDropdown text="mnemonic 1">
					<div className="p-2">
						{wallets.map((w) => (
							<p key={w}>{w}</p>
						))}
						<hr className="my-2 border-background-border" />
						<AddWallet
							onAddClick={() => console.log("add")}
							onCreateClick={() => console.log("create")}
						/>
					</div>
				</CustomDropdown>
			) : (
				<AddWallet
					onAddClick={() => console.log("add")}
					onCreateClick={() => console.log("create")}
				/>
			)}
		</div>
	);
};

export default WalletHeading;
