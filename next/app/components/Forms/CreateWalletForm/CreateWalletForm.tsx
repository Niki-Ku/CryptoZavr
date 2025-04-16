import CustomButton from "../../ui/CustomButton/CustomButton";

interface CreateWalletFormProps {
	mnemonic: string;
	error: string;
	onSubmit: (e: React.FormEvent) => void;
}

const CreateWalletForm: React.FC<CreateWalletFormProps> = ({
	mnemonic,
	error,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<p>This is your mnemonic key. Save it secure and don&apos;t share it</p>
			<textarea
				readOnly
				value={mnemonic}
				className="w-full h-20 resize-none p-2 rounded bg-transp-three focus-visible:outline-0"
			></textarea>
			{error && <span className="text-red-500">{error}</span>}
			<CustomButton type="submit" className="w-full">
				Create Wallet
			</CustomButton>
		</form>
	);
};

export default CreateWalletForm;
