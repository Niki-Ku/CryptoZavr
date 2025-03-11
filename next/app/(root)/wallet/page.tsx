import { ethers, JsonRpcProvider } from "ethers";
import WalletHeading from "@/app/components/layout/WalletHeading/WalletHeading";
import CryptoAssetsRow from "@/app/components/ui/CryptoAssetsRow/CryptoAssetsRow";
import { networks } from "@/utils/cryptoNetworks";
import { INetwork } from "@/types/types";
// Connect to the Ethereum network
// const provider = new JsonRpcProvider(
// 	`https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`
// );
const alchemyKey = process.env.ALCHEMY_SECRET_KEY;

const BnbTestProvider = new JsonRpcProvider(
	`https://bnb-testnet.g.alchemy.com/v2/${alchemyKey}`
);
// const BnbProvider = new JsonRpcProvider(
// 	`https://bnb-mainnet.g.alchemy.com/v2/${alchemyKey}`
// );

// TODO:
// manual creation of wallet or automatic when user registers?      DONE (manual)
// if creating - mnemonic phrase should be displayed to user
// if adding - user should be prompt to use mnemonic phrase
// make interface to show every available chain
//
// figure out where to store mnemonic phrases of users wallets

// find out how to get all necessary networks, their Icons 
// find out which networks may I use with this kind of wallet


const WalletPage = async () => {
	// Get block by number
	const blockNumber = "latest";
	// const block = await provider.getBlock(blockNumber);
	// const network = await provider.getNetwork();
	// const bnbNetwork = await BnbTestProvider.getNetwork();
	// create wallet
	// const mnemonic = await ethers.Wallet.createRandom().mnemonic?.phrase;
	// const wallet = await ethers.Wallet.fromPhrase(mnemonic!);

	// get wallet
	const mnemonic = ethers.Mnemonic.fromPhrase(
		"unaware young shy minor color phrase retreat able that mother youth favorite"
	);
	const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
	// const balance = await provider.getBalance(wallet.address);
	// const BnbBalance = await BnbProvider.getBalance(wallet.address);
	const BnbBalance = await BnbTestProvider.getBalance(wallet.address);
	// console.log(mnemonic);
	// console.log(wallet);
	// console.log(wallet.privateKey);

	// console.log(bnbNetwork.name);

  // console.log(ethers.formatEther(balance));
  

	return (
		<div>
			<div className="mx-auto mt-10 w-[90%] md:w-[60%] bg-background-component p-4 rounded-md">
				<WalletHeading />
			</div>
      <div className="mx-auto mt-10 w-[90%] md:w-[60%] bg-background-component p-4 rounded-md">
        {/* {networks.map((n : INetwork) => (
          <CryptoAssetsRow
            key={n.id}
            icon={n.coingeckoId}
            name={`${n.name} coin/token`}
            amount={Number(ethers.formatEther(BnbBalance))}
            networkName={n.name}
            networkUrl={n.rpcUrl}
            // onClick={() => console.log("click assets row")}
            address={wallet.address}
          />
        ))} */}
			</div>
			<p>Wallet adress: {wallet.address}</p>
			<p>Wallet publick key: {wallet.publicKey}</p>
			{/* <p>Wallet balance ETH: {ethers.formatEther(balance)}</p> */}
			{/* <p>Network: {network.name}</p> */}
			{/* <p>BNB Network: {bnbNetwork.name}</p> */}
			<p>BNB balance: {ethers.formatEther(BnbBalance)}</p>
		</div>
	);
};

export default WalletPage;
