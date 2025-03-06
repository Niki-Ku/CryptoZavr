import { ethers, JsonRpcProvider } from "ethers";
import WalletHeading from "@/app/components/layout/WalletHeading/WalletHeading";

// Connect to the Ethereum network
const alchemyKey = process.env.ALCHEMY_SECRET_KEY;
const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`);
const BnbTestProvider = new JsonRpcProvider(`https://bnb-testnet.g.alchemy.com/v2/${alchemyKey}`);
const BnbProvider = new JsonRpcProvider(`https://bnb-mainnet.g.alchemy.com/v2/${alchemyKey}`);

// TODO:
// instal Ethers.js   DONE
// connect to Blockchain      DONE
// register Alchemy account    DONE
// connect to test Blockchain     DONE
// figure out how to get keys and from where      DONE
// manual creation of wallet or automatic when user registers?      DONE (manual)
// try to make a wallet
// make two buttons for creating new wallet and one for adding existing wallet
  // if creating - mnemonic phrase should be displayed to user
  // if adding - user should be prompt to use mnemonic phrase
// make interface to show every available chain
// 
// figure out where to store mnemonic phrases of users wallets 
const WalletPage = async () => {

  // Get block by number
  const blockNumber = "latest";
  const block = await provider.getBlock(blockNumber);
  const network = await provider.getNetwork();
  const bnbNetwork = await BnbProvider.getNetwork();
  // create wallet
  // const mnemonic = await ethers.Wallet.createRandom().mnemonic?.phrase;
  // const wallet = await ethers.Wallet.fromPhrase(mnemonic!);
  
  // get wallet
  const mnemonic = ethers.Mnemonic.fromPhrase("unaware young shy minor color phrase retreat able that mother youth favorite")
  const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic)
  const balance = await provider.getBalance(wallet.address);
  const BnbBalance = await BnbProvider.getBalance(wallet.address);
  console.log(mnemonic);
  console.log(wallet);
  console.log(wallet.privateKey)

  console.log(ethers.formatEther(balance));
  return (
    <div>
      <div className="mx-auto mt-10 w-[90%] md:w-[60%] bg-background-component p-4 rounded-md">
        <WalletHeading />

      </div>
      <p>Wallet adress: {wallet.address}</p>
      <p>Wallet publick key: {wallet.publicKey}</p>
      <p>Wallet balance ETH: {ethers.formatEther(balance)}</p>
      <p>Network: {network.name}</p>
      <p>BNB Network: {bnbNetwork.name}</p>
      <p>BNB balance: {ethers.formatEther(BnbBalance)}</p>
    </div>
  )
};

export default WalletPage;
