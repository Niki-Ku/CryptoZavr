import CustomButton from "../../ui/CustomButton/CustomButton";
import CustomInput from "../../ui/CustomInput/CustomInput";

interface RenameWalletFormProps {
  walletId: string;
  walletNewName: string;
  onWalletNewNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (
		e: React.FormEvent,
		renameWalletId: string,
		newName: string
	) => void;
}

const RenameWalletForm: React.FC<RenameWalletFormProps> = ({
	onSubmit,
	walletNewName,
	onWalletNewNameChange,
	walletId,
}) => {
	return (
		<form onSubmit={(e) => onSubmit(e, walletId, walletNewName)}>
			<p className="text-xl">Set new name for your wallet:</p>
			<CustomInput
				className="my-2"
				value={walletNewName}
				onChange={onWalletNewNameChange}
			/>
			<CustomButton value="Rename" type="submit" className="w-full">
				Rename
			</CustomButton>
		</form>
	);
};

export default RenameWalletForm;
