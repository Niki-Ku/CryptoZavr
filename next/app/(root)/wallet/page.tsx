import { ethers, JsonRpcProvider } from "ethers";

// Connect to the Ethereum network
const alchemyKey = process.env.ALCHEMY_SECRET_KEY;
const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`);

// TODO:
// instal Ethers.js   DONE
// connect to Blockchain      DONE
// register Alchemy account    DONE
// connect to test Blockchain
// try to make a wallet
// figure out how to get keys and from where
// manual creation of wallet or automatic when user registers?
// maybe add additional field inside user
// figure out how to make multiple crypto wallet (one wallet for different cryptocurrencies or tokens)
const WalletPage = async () => {

  // Get block by number
  const blockNumber = "latest";
  const block = await provider.getBlock(blockNumber);
  const balance = await provider.getBalance("0xE94f1fa4F27D9d288FFeA234bB62E1fBC086CA0c");

  // create wallet
  // const mnemonic = await ethers.Wallet.createRandom().mnemonic?.phrase;
  // const wallet = await ethers.Wallet.fromPhrase(mnemonic!);

  // get wallet
  const mnemonic = await ethers.Mnemonic.fromPhrase("unaware young shy minor color phrase retreat able that mother youth favorite")
  const wallet = await ethers.HDNodeWallet.fromMnemonic(mnemonic)
  console.log(mnemonic);
  console.log(wallet);

  console.log(ethers.formatEther(balance));
  return (
    <div>
      <p>Wallet adress: {wallet.address}</p>
      <p>Wallet publick key: {wallet.publicKey}</p>
    </div>
  )
};

export default WalletPage;
