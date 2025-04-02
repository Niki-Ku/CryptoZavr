"use client";

import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import MnemonicInput from "../MnemonicInput/MnemonicInput";
import Modal from "../../ui/Modal/Modal";
import PasswordForm from "../../Forms/PasswordForm/PasswordForm";
import { ethers, HDNodeWallet, Mnemonic } from "ethers";
import { useEffect, useRef, useState } from "react";
import { IMnemonicPhraseInput } from "@/types/types";
import { wordlists } from "bip39";
import { Wallet } from "ethers";
import { openDB } from "idb";

// Define wallet type
interface IWalletHeading {
	wallets?: number[];
}

// create wallet
// const mnemonic = await ethers.Wallet.createRandom().mnemonic?.phrase;
// const wallet = await ethers.Wallet.fromPhrase(mnemonic!);


// export async function encryptMnemonicEthers(mnemonic : Mnemonic, password : string) {
//     const wallet = HDNodeWallet.fromMnemonic(mnemonic);
//     const encryptedJson = await wallet.encrypt(password); // JSON string
//     return encryptedJson;
// }

// export async function decryptMnemonicEthers(encryptedJson, password) {
// 	// const wallet = await Wallet.fromEncryptedJson(encryptedJson, password);
// 	const wallet = await HDNodeWallet.fromEncryptedJson(encryptedJson, password);
// 	return wallet.mnemonic.phrase;
// }

const dbName = "CryptoWalletDB";
const storeName = "wallets";

const setupDB = async () => {
    const db = await openDB(dbName, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "name" }); // 🔹 Use name as the primary key
            }
        },
    });
    return db;
}

const storeWallet = async (name : string, encryptedData : string) => {
	const db = await setupDB();
	await db.put(storeName, { name, data: encryptedData }); // 🔹 Store using name as key
	console.log(`Wallet "${name}" stored successfully!`);
}

const getAllWallets = async () => {
	const db = await setupDB();
	return await db.getAll(storeName);
}


// export const encryptMnemonicHD = async (mnemonic : Mnemonic, password : string) => {
export const encryptMnemonicHD = async (HDNodeWallet : HDNodeWallet, password : string) => {
	// const hdWallet = HDNodeWallet.fromMnemonic(mnemonic);
	const wallet = new Wallet(HDNodeWallet.privateKey); // Convert to Wallet
	const res = await wallet.encrypt(password); // Encrypt and return JSON
	return res;
}

export const decryptMnemonicHD = async (encryptedJson : string, password : string) => {
	const wallet = await Wallet.fromEncryptedJson(encryptedJson, password);
	// return wallet.mnemonic.phrase; // Returns mnemonic
	return wallet; // Returns mnemonic
}

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
	const [HDWallet, setHDWallet] = useState<HDNodeWallet | null>(null);
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
				setHDWallet(wallet);

				console.log(wallet);
				console.log("saved");
				console.log(indexDBPassword.current)
			}
		}
	};

	const [isAdded, setIsAdded] = useState<boolean>(false)
	useEffect(() => {
		// triggering work of async functions after
		const encryptAndStore = async (HDWallet : HDNodeWallet, password : string) => {
			const encryptedMnemonic = await encryptMnemonicHD(HDWallet, password);
			console.log(encryptedMnemonic);
			// add to indexedDB
			//
			await storeWallet("first Wallet", encryptedMnemonic)
			// temporary to see retrieved wallets
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

	useEffect(() => {
		(async () => {
			const wallets = await getAllWallets()
			console.log(wallets)
		 })();
	}, [isAdded])

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
