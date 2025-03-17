"use client";

import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import { ethers } from "ethers";
import Modal from "../../ui/Modal/Modal";
import { useEffect, useState } from "react";
import MnemonicInput from "../MnemonicInput/MnemonicInput";
import { IMnemonicPhraseInput } from "@/types/types";
// Define wallet type
interface IWalletHeading {
	wallets?: number[];
}
// add functions to add wallets
// where and how to store hd wallet credentials
// on create click
// user is asked to type password if there is no records in localStorage and notified that it is a way to access to the private keys
// of the wallet that is stored in his Storage DB. (this is functionality for better user experience)
// trigger creating of HDWallet
// user is shown his mnemonic for the first and the last time with warning and ability to copy it
// wallet created

// create wallet
// const mnemonic = await ethers.Wallet.createRandom().mnemonic?.phrase;
// const wallet = await ethers.Wallet.fromPhrase(mnemonic!);

// get wallet
const mnemonic = ethers.Mnemonic.fromPhrase(
	"unaware young shy minor color phrase retreat able that mother youth favorite"
);
const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
const WalletHeading: React.FC<IWalletHeading> = ({ wallets }) => {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [memonicPhraseInput, setMnemonicPhraseInput] = useState<
		IMnemonicPhraseInput[]
	>(new Array(24).fill({ isVisible: false, value: "" }));

	const onAddClick = () => {
		setIsAddModalOpen(true);
	};

	useEffect(() => {
		console.log(memonicPhraseInput)
	}, [memonicPhraseInput])

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
							onAddClick={onAddClick}
							onCreateClick={() => console.log("create")}
						/>
					</div>
				</CustomDropdown>
			) : (
				<AddWallet
					onAddClick={onAddClick}
					onCreateClick={() => console.log("create")}
				/>
			)}
			{isAddModalOpen && (
				<Modal isModalOpen={isAddModalOpen} onCloseClick={setIsAddModalOpen}>
					<p>
						Your Mnemoic key. It will be encrypted with your password and
						storred in your Session DB
					</p>
					<MnemonicInput arr={memonicPhraseInput} onChange={setMnemonicPhraseInput} />
				</Modal>
			)}
		</div>
	);
};

export default WalletHeading;
