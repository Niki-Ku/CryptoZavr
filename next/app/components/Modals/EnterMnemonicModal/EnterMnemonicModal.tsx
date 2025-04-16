import EnterMnemonicForm from "../../Forms/EnterMnemonicForm/EnterMnemonicForm";
import CustomDropdown from "../../ui/CustomDropdown/CustomDropdown";
import Modal from "../../ui/Modal/Modal";
import { EnterMnemonicFormProps } from "../../Forms/EnterMnemonicForm/EnterMnemonicForm";
import { SetStateAction } from "react";

interface EnterMnemonicModalProps extends EnterMnemonicFormProps {
	isOpenModal: boolean;
	onCloseModal: React.Dispatch<SetStateAction<boolean>>;
	mnemonicLengthDropdownIsOpen: boolean;
	onDropdownClick: () => void;
	dropdownText: string;
	onMnemonicLengthDropdowClick: (len: number) => void;
}

const mnemonicLength = [12, 18, 24];

const EnterMnemonicModal: React.FC<EnterMnemonicModalProps> = ({
	mnemonicLengthDropdownIsOpen,
	onDropdownClick,
	dropdownText,
	onMnemonicLengthDropdowClick,
	arr,
	onChange,
	onMnemonicSubmit,
	error,
	setError,
	isOpenModal,
	onCloseModal,
}) => {
	return (
		isOpenModal && (
			<Modal isModalOpen={isOpenModal} onCloseClick={onCloseModal}>
				<div>
					<p>
						Your Mnemoic key. It will be encrypted with your password and
						storred in your Session DB
					</p>
					<p>Choose how many words does your mnemonic have:</p>
					<CustomDropdown
						isOpen={mnemonicLengthDropdownIsOpen}
						onClick={onDropdownClick}
						text={dropdownText}
						className="z-10"
					>
						<div className="p-2 bg-background-main">
							{mnemonicLength.map((i: number) => (
								<p
									className="cursor-pointer"
									key={i}
									onClick={() => onMnemonicLengthDropdowClick(i)}
								>
									{i}
								</p>
							))}
						</div>
					</CustomDropdown>
					<EnterMnemonicForm
						arr={arr}
						onChange={onChange}
						onMnemonicSubmit={onMnemonicSubmit}
						error={error}
						setError={setError}
					/>
				</div>
			</Modal>
		)
	);
};

export default EnterMnemonicModal;
