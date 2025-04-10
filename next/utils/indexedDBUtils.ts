import { openDB } from "idb";

const dbName = "CryptoWalletDB";
const storeName = "wallets";
const getId = () => Math.random().toString(36).substring(2, 10);

export const setupDB = async () => {
	try {
		const db = await openDB(dbName, 3, {
			upgrade(db) {
				if (!db.objectStoreNames.contains(storeName)) {
					db.createObjectStore(storeName, { keyPath: "id" });
				}
			},
		});
		return db;
	} catch (error) {
		console.log(error);
	}
};

export const storeWallet = async (name: string, encryptedData: string) => {
	try {
		const db = await setupDB();
		if (!db) throw new Error("Error: db is not found");

		await db.put(storeName, { id: getId(), name, data: encryptedData });
	} catch (error) {
		console.log(error);
	}
};

export const getAllWallets = async () => {
	try {
		const db = await setupDB();
		if (!db) throw new Error("Error: db is not found");

		return await db.getAll(storeName);
	} catch (error) {
		console.log(error);
	}
};

export const deleteWallet = async (id: string) => {
	try {
		const db = await setupDB();
		if (!db) throw new Error("Error: db is not found");

		await db.delete(storeName, id);
	} catch (error) {
		console.log(error);
	}
};

export const renameWallet = async (id: string, newName: string) => {
	try {
		const db = await setupDB();
		if (!db) throw new Error("Error: db is not found");

		const wallet = await db.get(storeName, id);
		if (!wallet) {
			throw new Error(`Wallet with ID "${id}" not found.`);
		}

		wallet.name = newName;
		await db.put(storeName, wallet);
	} catch (error) {
		console.log(error);
	}
};
