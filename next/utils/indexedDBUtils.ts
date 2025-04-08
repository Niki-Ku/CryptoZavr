import { openDB } from "idb";

const dbName = "CryptoWalletDB";
const storeName = "wallets";

// add try catch???

export const setupDB = async () => {
	const db = await openDB(dbName, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: "name" }); // 🔹 Use name as the primary key
			}
		},
	});
	return db;
};

export const storeWallet = async (name: string, encryptedData: string) => {
	const db = await setupDB();
	await db.put(storeName, { name, data: encryptedData }); // 🔹 Store using name as key
	console.log(`Wallet "${name}" stored successfully!`);
};

export const getAllWallets = async () => {
	const db = await setupDB();
	return await db.getAll(storeName);
};

export const deleteWallet = async (name: string) => {
	const db = await setupDB();
	await db.delete(storeName, name);
	console.log(`Wallet "${name}" deleted!`);
};
