"use client";

import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import MnemonicInput from "../MnemonicInput/MnemonicInput";
import Modal from "../../ui/Modal/Modal";
import PasswordForm from "../../Forms/PasswordForm/PasswordForm";
import MnemonicRow from "../../ui/MnemonicRow/MnemonicRow";
import { HDNodeWallet } from "ethers";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { IMnemonicPhraseInput, IIndexedDBRecord, IWallet } from "@/types/types";
import {
	storeWallet,
	getAllWallets,
	deleteWallet,
	renameWallet,
} from "@/utils/indexedDBUtils";
import {
	checkMnemonicForErrors,
	createMnemonicFromInput,
	getWalletWithMnemonic,
	encryptMnemonicHD,
	decryptMnemonicHD,
} from "@/utils/ethersUtils";
import CustomInput from "../../ui/CustomInput/CustomInput";
import CustomButton from "../../ui/CustomButton/CustomButton";

// give the ability to change mnemonic name to user
// make create wallet button functional
// make UI
// asking for a password
// check if passwords matches with other if password was already set
// showing user input with phrase with a copy button and notification
// adding to the indexedDB

// use ReactPortal instead of Modal or in addition to it
// add /wallet to protected routes
// if user forget his password - give him ability to reset all wallets
// change names of the variables and functions/handlers


// open modal/portal
// use empty input field with button to submit
// optionally, limit input length to 64 chars
// onSubmit update wallets record in db

const mnemonicLength = [12, 18, 24];

const WalletHeading = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] =
		useState<boolean>(false);
	const indexDBPassword = useRef<string>("");
	const [walletPassword, setWalletPassword] = useState<string>("");
	const [HDWallet, setHDWallet] = useState<HDNodeWallet | null>(null);
	const [walletsDropdownIsOpen, setWalletsDropdownIsOpen] =
		useState<boolean>(false);
	const [wallets, setWallets] = useState<IIndexedDBRecord[]>([]);
	const [mnemonicLengthValue, setMnemonicLengthValue] = useState<number>(12);
	const [mnemonicLengthDropdownIsOpen, setMnemonicLengthDropdownIsOpen] =
		useState<boolean>(false);
	const [mnemonicPhraseInput, setMnemonicPhraseInput] = useState<
		IMnemonicPhraseInput[]
	>(new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" }));
	const [error, setError] = useState<string>("");
	const [renameModalIsOpen, setReanmeModalIsOpen] = useState<boolean>(false);
	const renameWalletId = useRef<string>('');
	const [newNameWallet, setNewNameWallet] = useState<string>('');

	const onAddClick = () => {
		setIsPasswordModalOpen(true);
	};

	const onPasswordSubmit = async (password: string) => {
		indexDBPassword.current = password;
		// check password
		if (wallets.length === 0) {
			setWalletPassword(password);
			setIsAddModalOpen(true);
			setIsPasswordModalOpen(false);
		}
		if (wallets.length > 0) {
			const { wallet, error: passError } = await decryptMnemonicHD(
				wallets[0].data,
				password
			);
			if (!passError) {
				setWalletPassword(password);
				setIsAddModalOpen(true);
				setIsPasswordModalOpen(false);
			}
			// ask about error messages, where to get them from?
			else setError("Error: Incorrect password");
		}
	};

	const onWalletPasswordSubmit = async (password: string) => {
		indexDBPassword.current = password;
		console.log(password);
		console.log(wallets);
		const { wallet, error: passError } = await decryptMnemonicHD(
			wallets[0].data,
			password
		);
		// check for errors and close mnemonic input and reset it
		console.log(wallet);
		console.log(passError);
		// sets password and closes the window
		if (!passError) setWalletPassword(password);
		// ask about error messages, where to get them from?
		else setError("Error: Incorrect password");
	};

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
				setMnemonicPhraseInput(
					new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" })
				);
				console.log(wallet);
				console.log("saved");
				console.log(indexDBPassword.current);
			}
		}
	};

	const onMnemonicLengthDropdown = (value: number) => {
		setMnemonicLengthValue(value);
		setMnemonicLengthDropdownIsOpen(false);
	};

	const [isAdded, setIsAdded] = useState<boolean>(false);
	useEffect(() => {
		// triggering work of async functions after
		const encryptAndStore = async (
			HDWallet: HDNodeWallet,
			password: string
		) => {
			const encryptedMnemonic = await encryptMnemonicHD(HDWallet, password);
			console.log(encryptedMnemonic);
			// add to indexedDB
			//
			if (encryptedMnemonic)
				await storeWallet(`Mnemonic ${wallets.length + 1}`, encryptedMnemonic);
			// temporary to see retrieved wallets
			// find a way how to trigger re-render without new useless state
			setIsAdded((prev) => !prev);
		};

		if (HDWallet) {
			encryptAndStore(HDWallet, indexDBPassword.current);
		}
	}, [HDWallet]);

	useEffect(() => {
		setMnemonicPhraseInput(
			new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" })
		);
	}, [mnemonicLengthValue]);

	const refreshWallets = async () => {
		const wallets = await getAllWallets() || [];
		setWallets(
			wallets.map((w) => {
				return { ...w, isIconClicked: false };
			})
		);
	};

	const toggleSettings = useCallback((id: string) => wallets.map((item: IIndexedDBRecord) =>
		item.id === id
			? { ...item, isIconClicked: !item.isIconClicked }
			: { ...item, isIconClicked: false }
	), [wallets]);

	const onDeleteClick = useCallback(async(e: React.MouseEvent<HTMLButtonElement>, id: string) => {
		e.stopPropagation();
		deleteWallet(id);
		setWallets(toggleSettings(id));
		await refreshWallets()
	}, [toggleSettings]);


	const onRenameClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: string) => {
		e.stopPropagation();
		setReanmeModalIsOpen(true);
		renameWalletId.current = id;
	}, []);

	const onRenameSubmit = useCallback(async (e: React.FormEvent, id: string, name: string) => {
		e.preventDefault();
		await renameWallet(id, name)
		setReanmeModalIsOpen(false);
		await refreshWallets()
	}, []);

	const onSettingsIconClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		id: string
	) => {
		e.stopPropagation();
		setWallets(toggleSettings(id));
	};

	const onRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		console.log("settings click");
	};

	useEffect(() => {	
		refreshWallets()
	}, [isAdded]);

	if (!walletPassword && wallets.length > 0)
		return (
			<PasswordForm
				onPasswordSubmit={onWalletPasswordSubmit}
				error={error}
				setPasswordError={setError}
			/>
		);
	return (
		<div className="w-full">
			{wallets.length > 0 ? (
				// use selected mnemonic name as text
				<CustomDropdown
					text="mnemonic 1"
					isOpen={walletsDropdownIsOpen}
					onClick={() => setWalletsDropdownIsOpen((prev) => !prev)}
				>
					<div>
						{wallets.map((w, i) => (
							<MnemonicRow
								onDeleteClick={onDeleteClick}
								onRenameClick={onRenameClick}
								onRowClick={onRowClick}
								onSettingsClick={onSettingsIconClick}
								isSettingsClicked={w.isIconClicked}
								name={w.name}
								mnemonicId={w.id}
								key={i}
							/>
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
							{mnemonicLength.map((i: number) => (
								<p
									className="cursor-pointer"
									key={i}
									onClick={() => onMnemonicLengthDropdown(i)}
								>
									{i}
								</p>
							))}
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
				<Modal
					isModalOpen={isPasswordModalOpen}
					onCloseClick={setIsPasswordModalOpen}
				>
					<PasswordForm
						text="Attention"
						onPasswordSubmit={onPasswordSubmit}
						error={error}
						setPasswordError={setError}
					/>
				</Modal>
			)}
			{renameModalIsOpen && (
				<Modal
					isModalOpen={renameModalIsOpen}
					onCloseClick={setReanmeModalIsOpen}
				>
					<form onSubmit={(e) => onRenameSubmit(e, renameWalletId.current, newNameWallet)}>
						<p className="text-xl">Set new name for your wallet:</p>
						<CustomInput className="my-2" value={newNameWallet} onChange={(e) => setNewNameWallet(e.target.value)} />
						<CustomButton value="Rename" type="submit" className="w-full">Rename</CustomButton>
					</form>
				</Modal>
			)}
		</div>
	);
};

export default WalletHeading;
