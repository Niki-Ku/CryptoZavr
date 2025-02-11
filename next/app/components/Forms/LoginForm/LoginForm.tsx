"use client";
import CustomInput from "../../ui/CustomInput/CustomInput";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import CustomButton from "../../ui/CustomButton/CustomButton";
import { loginUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { schemaLogin } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import Link from "next/link";
import { LoginUserProps } from "@/types/types";
import hidePass from "@/public/icons/another/hidePass.svg";
import showPass from "@/public/icons/another/showPass.svg";
import Image from "next/image";

const INITIAL_STATE = {
	data: null,
	zodErrors: null,
	strapiErrors: null,
	message: null,
};

// TODO:
// add show/hide password button (make state with all fields and on click update only needed)
// make possible to use only email as identifier instead of email and username

const LoginForm = () => {
	const [actionFormState, formAction] = useFormState(
		loginUserAction,
		INITIAL_STATE
	);
	const [passwordType, setpasswordType] = useState<boolean>(true);
	const fromRef = useRef<HTMLFormElement>(null);
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = useForm<LoginUserProps>({
		resolver: zodResolver(schemaLogin),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	return (
		<>
			<div className="text-3xl my-8 font-bold">Welcome to CryptoZavr</div>
			<form
				action={formAction}
				ref={fromRef}
				onSubmit={handleSubmit(() => fromRef.current?.submit())}
				className="flex flex-col gap-2"
			>
				<div>
					<Controller
						name="identifier"
						control={control}
						render={({ field }) => (
							<CustomInput {...field} placeholder="Email" type="text" />
						)}
					/>
					<ErrorMessage
						error={
							errors.identifier?.message || actionFormState?.zodErrors?.email
						}
					/>
				</div>
				<div>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<CustomInput
								{...field}
								icon={
									<Image
										alt="hide/show password"
										src={passwordType ? showPass : hidePass}
										className="w-6"
									/>
								}
								onIconClick={() => setpasswordType((prev) => !prev)}
								placeholder="Password"
								type={passwordType ? "password" : "text"}
							></CustomInput>
						)}
					/>
					<ErrorMessage
						error={
							errors.password?.message || actionFormState?.zodErrors?.password
						}
					/>
				</div>
				<CustomButton disabled={isSubmitting} className="w-full mt-4">
					{isSubmitting ? "Loading..." : "Submit"}
				</CustomButton>
				<ErrorMessage
					className="mx-auto"
					error={actionFormState?.strapiErrors?.message}
				/>
			</form>
			<Link
				href="/reset-password"
				className="text-sm underline mt-6 block text-center hover:text-complementary-coral"
			>
				Forget your password?
			</Link>
		</>
	);
};

export default LoginForm;
