"use client";

import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import MnemonicInput from "../MnemonicInput/MnemonicInput";
import Modal from "../../ui/Modal/Modal";
import PasswordForm from "../../Forms/PasswordForm/PasswordForm";
import { HDNodeWallet } from "ethers";
import { useEffect, useRef, useState } from "react";
import { IMnemonicPhraseInput } from "@/types/types";
import { storeWallet, getAllWallets, deleteWallet } from "@/utils/indexedDBUtils";
import { checkMnemonicForErrors, createMnemonicFromInput, getWalletWithMnemonic, encryptMnemonicHD, decryptMnemonicHD } from "@/utils/ethersUtils";

// try add more than one wallet or wallet with the same name (mnemonics with same name are overwritten by new mnemonic)
// give the ability to change mnemonic name to user
	// make create wallet button functional
		// make UI
		// asking for a password 
			// check if passwords matches with other if password was already set
		// showing user input with phrase with a copy button and notification
		// adding to the indexedDB
		
// use ReactPortal instead of Modal or in addition to it
// add /wallet to protected routes

const mnemonicLength = [12, 18, 24]

const WalletHeading = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
	const indexDBPassword = useRef<string>('');
	const [walletPassword, setWalletPassword] = useState<string>('');
	const [HDWallet, setHDWallet] = useState<HDNodeWallet | null>(null);
	const [walletsDropdownIsOpen, setWalletsDropdownIsOpen] = useState<boolean>(false);
	const [wallets, setWallets] = useState<{ name: string, data: string }[]>([]);
	const [mnemonicLengthValue, setMnemonicLengthValue] = useState<number>(12);
	const [mnemonicLengthDropdownIsOpen, setMnemonicLengthDropdownIsOpen] = useState<boolean>(false);
	const [mnemonicPhraseInput, setMnemonicPhraseInput] = useState<
		IMnemonicPhraseInput[]
	>(new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" }));
	const [error, setError] = useState<string>("");

	const onAddClick = () => {
		setIsPasswordModalOpen(true);
	};

	const onPasswordSubmit = async (password: string) => {
		indexDBPassword.current = password;
		// check password
		if (wallets) {
		const { wallet, error : passError} = await decryptMnemonicHD(wallets[0].data, password);
			if (!passError) {
				setWalletPassword(password)
				setIsAddModalOpen(true);
				setIsPasswordModalOpen(false);
			}
			// ask about error messages, where to get them from?
			else setError("Error: Incorrect password")
		}
	}
	
	const onWalletPasswordSubmit = async (password: string) => {
		indexDBPassword.current = password;
		console.log(password)
		console.log(wallets);
		const { wallet, error : passError} = await decryptMnemonicHD(wallets[0].data, password);
		// check for errors and close mnemonic input and reset it
		console.log(wallet)
		console.log(passError)
		// sets password and closes the window
		if (!passError) setWalletPassword(password);
		// ask about error messages, where to get them from?
		else setError("Error: Incorrect password")
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
				// reset inputs
				setHDWallet(wallet);
				setIsAddModalOpen(false);
				setMnemonicPhraseInput(new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" }));
				console.log(wallet);
				console.log("saved");
				console.log(indexDBPassword.current)
			}
		}
	};

	const onMnemonicLengthDropdown = (value : number) => {
		setMnemonicLengthValue(value)
		setMnemonicLengthDropdownIsOpen(false);
	}

	const [isAdded, setIsAdded] = useState<boolean>(false);
	useEffect(() => {
		// triggering work of async functions after
		const encryptAndStore = async (HDWallet : HDNodeWallet, password : string) => {
			const encryptedMnemonic = await encryptMnemonicHD(HDWallet, password);
			console.log(encryptedMnemonic);
			// add to indexedDB
			//
			if (encryptedMnemonic)
				await storeWallet(`Mnemonic ${wallets.length + 1}`, encryptedMnemonic)
			// temporary to see retrieved wallets
			// find a way how to trigger re-render without new useless state
			setIsAdded(prev => !prev);
		};

		if (HDWallet) {
			encryptAndStore(HDWallet, indexDBPassword.current)
		}
	}, [HDWallet])

	// remove
	useEffect(() => {
		console.log(mnemonicPhraseInput);
	}, [mnemonicPhraseInput]);

	// useEffect(() => {
	// 	deleteWallet("second Wallet")
	// }, [])

	useEffect(() => {
		(async () => {
			const wallets = await getAllWallets()
			setWallets(wallets)
			console.log(wallets)
		 })();
	}, [isAdded])

	useEffect(() => {
		setMnemonicPhraseInput(new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" }))
	}, [mnemonicLengthValue])


	if (!walletPassword && wallets.length > 0) return (
		<PasswordForm onPasswordSubmit={onWalletPasswordSubmit} error={error} setPasswordError={setError} />
	)
	return (
		<div className="w-full">
			{wallets.length > 0 ? (
				// use selected mnemonic name as text
				<CustomDropdown
					text="mnemonic 1"
					isOpen={walletsDropdownIsOpen}
					onClick={() => setWalletsDropdownIsOpen((prev) => !prev)}
				>
					<div className="p-2">
						{wallets.map((w, i) => (
							// onClick make clicked wallet active
							<p key={i}>{w.name}</p>
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
					<p>Choose how many words does your mnemonic have:</p>
					<CustomDropdown
						isOpen={mnemonicLengthDropdownIsOpen}
						onClick={() => setMnemonicLengthDropdownIsOpen((prev) => !prev)}
						text={`${mnemonicLengthValue}`}
						className="z-10"
					>
						<div className="p-2 bg-background-main">
							{mnemonicLength.map((i: number) => <p className="cursor-pointer" key={i} onClick={() => onMnemonicLengthDropdown(i)}>{i}</p>)}
						</div>
					</CustomDropdown>
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
					<PasswordForm text="Attention" onPasswordSubmit={onPasswordSubmit} error={error} setPasswordError={setError}  />
				</Modal>
			)}
		</div>
	);
};

export default WalletHeading;
