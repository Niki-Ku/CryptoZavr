"use client"

import AuthFormLayout from "@/app/components/AuthFormLayout/AuthFormLayout";
import { registerUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null
}

const RegisterPage = () => {
  const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
  console.log(formState)
	return (
		<AuthFormLayout links="register">
			Register form
			<form action={formAction}>
        <input type="text" name="userName" />
        <div>{formState?.zodErrors?.userName ? <span className="text-feedback-error">{formState.zodErrors.userName}</span> : null }</div>
				<br />
        <input type="text" name="email" />
        <div>{formState?.zodErrors?.email ? <span className="text-feedback-error">{formState.zodErrors.email}</span> : null }</div>
				<br />
        <input type="password" name="password" />
        <div>{formState?.zodErrors?.password ? <span className="text-feedback-error">{formState.zodErrors.password}</span> : null }</div>
				<br />
        <input type="password" name="passwordRepeat" />
        <div>{formState?.zodErrors?.passwordRepeat ? <span className="text-feedback-error">{formState.zodErrors.passwordRepeat}</span> : null }</div>
				<br />
				<button>Submit</button>
			</form>
		</AuthFormLayout>
	);
};

export default RegisterPage;
