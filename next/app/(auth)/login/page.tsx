import AuthFormLayout from "@/app/components/layout/AuthFormLayout/AuthFormLayout";
import LoginForm from "@/app/components/Forms/LoginForm/LoginForm";

const LoginPage = () => {
	return (
		<AuthFormLayout links="login">
			<LoginForm />
		</AuthFormLayout>
	);
};

export default LoginPage;
