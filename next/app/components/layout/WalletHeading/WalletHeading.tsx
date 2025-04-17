import AddWallet from "../../ui/AddWallet/AddWallet";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import MnemonicRow from "../../ui/MnemonicRow/MnemonicRow";
import { IIndexedDBRecord } from "@/types/types";

interface WalletHeadingProps {
	wallets: IIndexedDBRecord[];
	isDropdownOpen: boolean;
	onDropdownClick: () => void;
	onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
	onRenameClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
	onRowClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	onSettingsIconClick: (
		e: React.MouseEvent<HTMLButtonElement>,
		id: string
	) => void;
	onAddWallet: () => void;
	onCreateWallet: () => void;
}

const WalletHeading: React.FC<WalletHeadingProps> = ({
	wallets,
	isDropdownOpen,
	onDeleteClick,
	onRenameClick,
	onRowClick,
	onSettingsIconClick,
	onAddWallet,
	onCreateWallet,
	onDropdownClick,
}) => {
	return (
		<div className="w-full relative z-10">
			{wallets.length > 0 ? (
				// use selected mnemonic name as text
				<CustomDropdown
					text="mnemonic 1"
					isOpen={isDropdownOpen}
					onClick={onDropdownClick}
				>
					<div>
						{/* make a component out of it maybe??? */}
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
							onAddClick={onAddWallet}
							onCreateClick={onCreateWallet}
						/>
					</div>
				</CustomDropdown>
			) : (
				<AddWallet onAddClick={onAddWallet} onCreateClick={onCreateWallet} />
			)}
		</div>
	);
};

export default WalletHeading;
