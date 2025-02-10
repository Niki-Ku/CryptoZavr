"use client";
import { registerUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";
import CustomInput from "../../ui/CustomInput/CustomInput";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import CustomButton from "../../ui/CustomButton/CustomButton";
import { Controller, useForm } from "react-hook-form";
import { schemaRegister, schemaRegisterType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

const INITIAL_STATE = {
	data: null,
	zodErrors: null,
	strapiErrors: null,
	message: null,
};

// TODO:
// add show/hide password button (make state with all fields and on click update only needed)
// try to make validation onBlur

const RegisterForm = () => {
	const [actionFormState, formAction] = useFormState(
		registerUserAction,
		INITIAL_STATE
	);
	const fromRef = useRef<HTMLFormElement>(null);
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = useForm<schemaRegisterType>({
		resolver: zodResolver(schemaRegister),
		defaultValues: {
			email: "",
			password: "",
			passwordRepeat: "",
			username: "",
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
						name="email"
						control={control}
						render={({ field }) => (
							<CustomInput {...field} placeholder="Email" type="text" />
						)}
					/>
					<ErrorMessage
						error={errors.email?.message || actionFormState?.zodErrors?.email}
					/>
				</div>
				<div>
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<CustomInput {...field} placeholder="Username" type="text" />
						)}
					/>
					<ErrorMessage
						error={
							errors.username?.message || actionFormState?.zodErrors?.username
						}
					/>
				</div>
				<div>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<CustomInput {...field} placeholder="Password" type="password" />
						)}
					/>
					<ErrorMessage
						error={
							errors.password?.message || actionFormState?.zodErrors?.password
						}
					/>
				</div>
				<div>
					<Controller
						name="passwordRepeat"
						control={control}
						render={({ field }) => (
							<CustomInput
								{...field}
								placeholder="Confirm password"
								type="password"
							/>
						)}
					/>
					<ErrorMessage
						error={
							errors.passwordRepeat?.message ||
							actionFormState?.zodErrors?.passwordRepeat
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
		</>
	);
};

export default RegisterForm;
