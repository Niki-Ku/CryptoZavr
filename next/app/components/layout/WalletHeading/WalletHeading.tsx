"use client";

import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import MnemonicInput from "../MnemonicInput/MnemonicInput";
import Modal from "../../ui/Modal/Modal";
import PasswordForm from "../../Forms/PasswordForm/PasswordForm";
import { ethers, HDNodeWallet } from "ethers";
import { useEffect, useRef, useState } from "react";
import { IMnemonicPhraseInput } from "@/types/types";
import { wordlists } from "bip39";

// Define wallet type
interface IWalletHeading {
	wallets?: number[];
}

// create wallet
// const mnemonic = await ethers.Wallet.createRandom().mnemonic?.phrase;
// const wallet = await ethers.Wallet.fromPhrase(mnemonic!);

const checkMnemonicForErrors = (arr: IMnemonicPhraseInput[]) => {
	let errors = false;
	arr.forEach((p: IMnemonicPhraseInput) => {
		if (!wordlists.english.includes(p.value)) {
			errors = true;
		}
	});
	return errors;
};

const createMnemonicFromInput = (arr: IMnemonicPhraseInput[]) => {
	return arr.map((p: IMnemonicPhraseInput) => p.value).join(" ");
};

const getWalletWithMnemonic = (
	mnemonic: string
): { wallet: HDNodeWallet | null; error: string | null } => {

	try {
		const mnemonicPhrase = ethers.Mnemonic.fromPhrase(mnemonic);
		const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicPhrase);
		return { wallet, error: null };

	} catch (error) {
		if (error instanceof Error) {
			return { wallet: null, error: error.message };
		} else {
			return { wallet: null, error: `${error}` };
		} 
	}
};

const WalletHeading: React.FC<IWalletHeading> = ({ wallets }) => {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
	const indexDBPassword = useRef<string>('');
	const [mnemonicPhraseInput, setMnemonicPhraseInput] = useState<
		IMnemonicPhraseInput[]
	>(new Array(12).fill({ isVisible: true, value: "" }));
	const [error, setError] = useState<string>("");

	const onAddClick = () => {
		setIsPasswordModalOpen(true);
	};

	const onPasswordSubmit = (password: string) => {
		indexDBPassword.current = password;
		setIsAddModalOpen(true)
		setIsPasswordModalOpen(false)
	}

	const onMnemonicSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let errors = checkMnemonicForErrors(mnemonicPhraseInput);
		if (errors) {
			setError(
				"At least one of your words is not a valid mnemonic word. Please check for typos or select a word from the official BIP-39 list."
			);
		} else {
			const { wallet, error } = getWalletWithMnemonic(
				createMnemonicFromInput(mnemonicPhraseInput)
			);
			if (error) setError(error);
			else {
				// save to index.db and hash/encrypt it with password
					// check if there is encrypted storage with password that
					// if not - create one 
					// else - add to existing
				// reset inputs
				console.log(wallet);
				console.log("saved");
				console.log(indexDBPassword.current)
			}
		}
	};

	useEffect(() => {
		console.log(mnemonicPhraseInput);
	}, [mnemonicPhraseInput]);

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
					{/* move to separate form component*/}
					<p>
						Your Mnemoic key. It will be encrypted with your password and
						storred in your Session DB
					</p>
					<MnemonicInput
						arr={mnemonicPhraseInput}
						onChange={setMnemonicPhraseInput}
						onMnemonicSubmit={onMnemonicSubmit}
						error={error}
						setError={setError}
					/>
				</Modal>
			)}
			{isPasswordModalOpen && (
				<Modal isModalOpen={isPasswordModalOpen} onCloseClick={setIsPasswordModalOpen} >
					<PasswordForm text="Attention" onPasswordSubmit={onPasswordSubmit} />
				</Modal>
			)}
		</div>
	);
};

export default WalletHeading;
