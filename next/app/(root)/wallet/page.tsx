import { ethers, JsonRpcProvider } from "ethers";
import WalletHeading from "@/app/components/layout/WalletHeading/WalletHeading";
import CryptoAssetsRow from "@/app/components/ui/CryptoAssetsRow/CryptoAssetsRow";
import { networks } from "@/config/cryptoNetworks";
import { INetwork } from "@/types/types";

const alchemyKey = process.env.ALCHEMY_SECRET_KEY;

const BnbTestProvider = new JsonRpcProvider(
	`https://bnb-testnet.g.alchemy.com/v2/${alchemyKey}`
);
// TODO:
// if creating - mnemonic phrase should be displayed to user
// if adding - user should be prompt to use mnemonic phrase
// make interface to show every available chain
// figure out where to store mnemonic phrases of users wallets

// const getCoinDataById = async (
// 	coinId: string
// ): Promise<ICoingeckoCoinResponse | null> => {
// 	try {
// 		const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
// 		const data = await res.json();
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		return null;
// 	}
// };


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
  // console.log(ethers.formatEther(balance));


	return (
		<div>
      <div className="mx-auto mt-10 w-[90%] md:w-[60%] bg-background-component p-4 rounded-md">
        <WalletHeading />
        <div>
          {networks.map((n: INetwork, i: number) => (
            <CryptoAssetsRow
              key={i}
              iconUrl={"https://coin-images.coingecko.com/coins/images/31069/small/worldcoin.jpeg?1696529903"}
              // name={n.name + " coin"}
              name={"BNB"}
              networkName={n.name}
              amount={10}
              address={wallet.publicKey}
              price={88}
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export default WalletPage;
