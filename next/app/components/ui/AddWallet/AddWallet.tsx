"use client";
import CustomButton from "../CustomButton/CustomButton";

interface IAddWallet {
	onAddClick: () => void;
	onCreateClick: () => void;
}

const AddWallet: React.FC<IAddWallet> = ({ onAddClick, onCreateClick }) => {
	return (
		<div className="flex gap-2">
			<CustomButton onClick={onAddClick} className="w-full">
				Add Existing Wallet
			</CustomButton>
			<CustomButton onClick={onCreateClick} className="w-full">
				Create Wallet
			</CustomButton>
		</div>
	);
};

export default AddWallet;
