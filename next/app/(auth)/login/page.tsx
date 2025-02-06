import AuthFormLayout from "@/app/components/layout/AuthFormLayout/AuthFormLayout";

const LoginPage = () => {
	return (
		<AuthFormLayout links="login">
			Login form
			<form action="">
				<input type="email" />
				<br />
				<input type="password" />
				<br />
				<button>Submit</button>
			</form>
		</AuthFormLayout>
	);
};

export default LoginPage;
