import { openDB } from "idb";

const dbName = "CryptoWalletDB";
const storeName = "wallets";
const getId = () =>  Math.random().toString(36).substring(2, 10);

// add try catch???

export const setupDB = async () => {
	const db = await openDB(dbName, 3, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: "id" });
			}
    },
	});
	return db;
};

export const storeWallet = async (name: string, encryptedData: string) => {
	const db = await setupDB();
	await db.put(storeName, { id: getId(), name,  data: encryptedData });
	console.log(`Wallet "${name}" stored successfully!`);
};

export const getAllWallets = async () => {
	const db = await setupDB();
	return await db.getAll(storeName);
};

export const deleteWallet = async (id: string) => {
	const db = await setupDB();
	await db.delete(storeName, id);
	console.log(`Wallet "${id}" deleted!`);
};
