import CustomInput from "../../ui/CustomInput/CustomInput";
import hidePassImg from "@/public/icons/another/hidePass.svg";
import showPassImg from "@/public/icons/another/showPass.svg";
import Image from "next/image";
import { IMnemonicPhraseInput } from "@/types/types";
import CustomButton from "../../ui/CustomButton/CustomButton";

interface IMnemonicInput {
	arr: IMnemonicPhraseInput[];
	onChange: React.Dispatch<React.SetStateAction<IMnemonicPhraseInput[]>>;
	onMnemonicSubmit: (e:React.FormEvent) => void;
	error?: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

// make mobile version
const MnemonicInput: React.FC<IMnemonicInput> = ({ arr, onChange, onMnemonicSubmit, error, setError }) => {
	const inputChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
		const mutateArr = arr.map((item: IMnemonicPhraseInput, index: number) =>
			index === i ? { ...item, value: e.target.value.trim() } : item
		);
		onChange(mutateArr);
		if (error) setError('');
	};

	const inputIconClick = (i: number) => {
		const mutateArr = arr.map((item: IMnemonicPhraseInput, index: number) =>
			index === i ? { ...item, isVisible: !item.isVisible } : item
		);
		onChange(mutateArr);
	};

	const gridStyles: Record<number, string> = {
		12: "grid-cols-2",
		18: "grid-cols-3",
		24: "grid-cols-4",
	};

	return (
		<form onSubmit={onMnemonicSubmit}>
			<div
				className={`grid grid-flow-col grid-rows-6 gap-2 ${
					gridStyles[arr.length]
				}`}
			>
				{arr.map(
					(element: { isVisible: boolean; value: string }, i: number) => (
						<CustomInput
							key={i}
							value={arr[i].value}
							name={"input" + i}
							type={element.isVisible ? "text" : "password"}
							onChange={(e) => inputChange(e, i)}
							onIconClick={() => inputIconClick(i)}
							placeholder={`Word ${i + 1}`}
							icon={
								<Image
									src={element.isVisible ? hidePassImg : showPassImg}
									alt={`${element.isVisible ? "hide" : "show"} password`}
									className="w-6"
								/>
							}
						/>
					)
				)}
			</div>
			{error && (<div className="text-red-500">{error}</div>)}
			<CustomButton className="w-full mt-2">Add Wallet</CustomButton>
		</form>
	);
};

export default MnemonicInput;
