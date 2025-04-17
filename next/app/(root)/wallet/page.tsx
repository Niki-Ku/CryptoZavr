"use client"

import { HDNodeWallet, JsonRpcProvider } from "ethers";
import WalletHeading from "@/app/components/layout/WalletHeading/WalletHeading";
import CryptoAssetsRow from "@/app/components/ui/CryptoAssetsRow/CryptoAssetsRow";
import { networks } from "@/config/cryptoNetworks";
import { IIndexedDBRecord, IMnemonicPhraseInput, INetwork } from "@/types/types";
import Modal from "@/app/components/ui/Modal/Modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { checkMnemonicForErrors, createMnemonic, createMnemonicFromInput, createWalletFromMnemonic, decryptMnemonicHD, encryptMnemonicHD, getWalletWithMnemonic } from "@/utils/ethersUtils";
import { deleteWallet, getAllWallets, renameWallet, storeWallet } from "@/utils/indexedDBUtils";
import PasswordForm from "@/app/components/Forms/PasswordForm/PasswordForm";
import CreateWalletForm from "@/app/components/Forms/CreateWalletForm/CreateWalletForm";
import RenameWalletForm from "@/app/components/Forms/RenameWalletForm/RenameWalletForm";
import EnterMnemonicModal from "@/app/components/Modals/EnterMnemonicModal/EnterMnemonicModal";

const alchemyKey = process.env.ALCHEMY_SECRET_KEY;

const BnbTestProvider = new JsonRpcProvider(
	`https://bnb-testnet.g.alchemy.com/v2/${alchemyKey}`
);

// add copy button to mnemonic textarea
// add /wallet to protected routes
// if user forget his password - give him ability to reset all wallets
// change names of the variables and functions/handlers
// code refactoring/optimisation
// upgrade design and update for mobile
// optionally, limit input length when renaming wallet to 64 chars

const WalletPage = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] =
		useState<boolean>(false);
	const [mnemonicLengthDropdownIsOpen, setMnemonicLengthDropdownIsOpen] =
		useState<boolean>(false);
	const [renameModalIsOpen, setReanmeModalIsOpen] = useState<boolean>(false);
	const [walletNewName, setWalletNewName] = useState<string>("");
	const [mnemonicLengthValue, setMnemonicLengthValue] = useState<number>(12);
	const [mnemonicPhraseInput, setMnemonicPhraseInput] = useState<
		IMnemonicPhraseInput[]
	>(new Array(mnemonicLengthValue).fill({ isVisible: true, value: "" }));
	const isCreatingWallet = useRef<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>("");
  const indexDBPassword = useRef<string>("");
	const [walletPassword, setWalletPassword] = useState<string>("");
	const [HDWallet, setHDWallet] = useState<HDNodeWallet | null>(null);
	const [walletsDropdownIsOpen, setWalletsDropdownIsOpen] =
		useState<boolean>(false);
	const [wallets, setWallets] = useState<IIndexedDBRecord[]>([]);
	const [error, setError] = useState<string>("");
	const renameWalletId = useRef<string>('');

	const onAddWallet = () => {
		setIsPasswordModalOpen(true);
	};

	const onCreateWallet = () => {
		isCreatingWallet.current = true;
		setIsPasswordModalOpen(true);
	};

	const setupMnemonic = () => {
		setMnemonic(createMnemonic() || "");
		setIsCreateModalOpen(true);
	};

  const createWallet = (e: React.FormEvent) => {
    e.preventDefault();
		if (!mnemonic) {
			setError("Error: mnemonic is not found");
			return;
		}
		setHDWallet(createWalletFromMnemonic(mnemonic));
		setIsCreateModalOpen(false);
	};

	const onPasswordSubmit = async (password: string) => {
		indexDBPassword.current = password;
		// check password
		if (wallets.length === 0) {
			setWalletPassword(password);
			setIsPasswordModalOpen(false);
			isCreatingWallet.current
				? // and here also
				  setupMnemonic()
				: setIsAddModalOpen(true);
		}
		if (wallets.length > 0) {
			const { wallet, error: passError } = await decryptMnemonicHD(
				wallets[0].data,
				password
			);
			if (!passError) {
				setWalletPassword(password);
				setIsPasswordModalOpen(false);
				// change setIsCreateModalOpen to another function
				isCreatingWallet.current ? setupMnemonic() : setIsAddModalOpen(true);
			}
			// ask about error messages, where to get them from?
			else setError("Error: Incorrect password");
		}
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
  
  const onDropdownClick = () => {
    setWalletsDropdownIsOpen((prev) => !prev)
  }

	const onSettingsIconClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		id: string
	) => {
		e.stopPropagation();
		setWallets(toggleSettings(id));
  };
  
  const onWalletNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletNewName(e.target.value);
  }

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
		<div>
			<div className="mx-auto mt-10 w-[90%] md:w-[60%] bg-background-component p-4 rounded-md">
        <WalletHeading
          wallets={wallets}
          isDropdownOpen={walletsDropdownIsOpen}
          onDeleteClick={onDeleteClick}
          onRenameClick={onRenameClick}
          onRowClick={onRowClick}
          onSettingsIconClick={onSettingsIconClick}
          onAddWallet={onAddWallet}
          onCreateWallet={onCreateWallet}
          onDropdownClick={onDropdownClick}
        />
				<div>
					{networks.map((n: INetwork, i: number) => (
            <CryptoAssetsRow
              key={i}
              iconUrl={"https://coin-images.coingecko.com/coins/images/31069/small/worldcoin.jpeg?1696529903"}
              // name={n.name + " coin"}
              name={"BNB"}
              networkName={n.networkName}
              amount={10}
              address={n.networkId}
              price={88}
            />
          ))}
				</div>
			</div>

      <EnterMnemonicModal
        mnemonicLengthDropdownIsOpen={mnemonicLengthDropdownIsOpen}
        onDropdownClick={() => setMnemonicLengthDropdownIsOpen((prev) => !prev)}
        dropdownText={`${mnemonicLengthValue}`}
        onMnemonicLengthDropdowClick={onMnemonicLengthDropdown}
        arr={mnemonicPhraseInput}
        onChange={setMnemonicPhraseInput}
        onMnemonicSubmit={onMnemonicSubmit}
        error={error}
        setError={setError}
        isOpenModal={isAddModalOpen}
        onCloseModal={setIsAddModalOpen}
      />
      
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
          <RenameWalletForm
            onSubmit={onRenameSubmit}
            walletNewName={walletNewName}
            onWalletNewNameChange={onWalletNewNameChange}
            walletId={renameWalletId.current}
          />
				</Modal>
      )}
      
			{isCreateModalOpen && (
				<Modal
					isModalOpen={isCreateModalOpen}
					onCloseClick={setIsCreateModalOpen}
        >
          <CreateWalletForm
            mnemonic={mnemonic}
            error={error}
            onSubmit={createWallet}
          />
				</Modal>
			)}
		</div>
	);
};

export default WalletPage;
