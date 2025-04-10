import CustomInput from "../../ui/CustomInput/CustomInput";
import CustomButton from "../../ui/CustomButton/CustomButton";
import Image from "next/image";
import hidePassImg from "@/public/icons/another/hidePass.svg";
import showPassImg from "@/public/icons/another/showPass.svg";
import { SetStateAction, useState } from "react";
import { schemaPassword } from "@/schemas/schemas";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordForm = ({
	text,
	onPasswordSubmit,
	error,
	setPasswordError,
}: {
	text?: string;
	onPasswordSubmit: (password: string) => void;
	error?: string;
	setPasswordError?: React.Dispatch<SetStateAction<string>>;
}) => {
	const [isVisiblePass, setIsViisiblePass] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ password: string }>({
		resolver: zodResolver(schemaPassword),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit: SubmitHandler<{ password: string }> = (data) => {
		onPasswordSubmit(data.password);
	};

	const resetError = () => {
		if (error && setPasswordError) setPasswordError("");
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex min-h-[200px] flex-col grow justify-between"
		>
			{text && <p>{text}</p>}
			<div className="mt-10">
				<CustomInput
					{...register("password")}
					type={isVisiblePass ? "text" : "password"}
					onChange={resetError}
					onIconClick={() => setIsViisiblePass((prev) => !prev)}
					placeholder="Index DB password"
					icon={
						<Image
							src={isVisiblePass ? hidePassImg : showPassImg}
							alt={`${isVisiblePass ? "hide" : "show"} password`}
							className="w-6"
						/>
					}
				/>
				{errors && (
					<p className="text-red-500 font-sm">{errors.password?.message}</p>
				)}
				{error && <p className="text-red-500 font-sm">{error}</p>}
				<CustomButton type="submit" className="w-full mt-4">
					Next
				</CustomButton>
			</div>
		</form>
	);
};

export default PasswordForm;
