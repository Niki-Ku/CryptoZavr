import { wordlists } from "bip39";
import { Wallet } from "ethers";
import { ethers, HDNodeWallet } from "ethers";
import { IMnemonicPhraseInput } from "@/types/types";

export const encryptMnemonicHD = async (
	HDNodeWallet: HDNodeWallet,
	password: string
) => {
	try {
		const encryptedJson = await HDNodeWallet.encrypt(password);
		return encryptedJson;
	} catch (error) {
		console.log(error);
	}
};

export const decryptMnemonicHD = async (
	encryptedJson: string,
	password: string
) : Promise<{wallet : HDNodeWallet | Wallet | null, error : string}> => {
	try {
		const wallet = await Wallet.fromEncryptedJson(encryptedJson, password);
		return {wallet: wallet, error: ""}; // Returns mnemonic
	} catch (error) {
    console.log(error);
    return {wallet : null, error: `${error}`}
	}
};

export const checkMnemonicForErrors = (arr: IMnemonicPhraseInput[]) => {
	let errors = false;
	arr.forEach((p: IMnemonicPhraseInput) => {
		if (!wordlists.english.includes(p.value)) {
			errors = true;
		}
	});
	return errors;
};

export const createMnemonicFromInput = (arr: IMnemonicPhraseInput[]) => {
	return arr.map((p: IMnemonicPhraseInput) => p.value).join(" ");
};

export const getWalletWithMnemonic = (
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
