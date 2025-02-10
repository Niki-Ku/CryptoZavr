import AuthFormLayout from "@/app/components/layout/AuthFormLayout/AuthFormLayout";
import RegisterForm from "@/app/components/Forms/RegisterForm/RegisterForm";

const RegisterPage = () => {
	return (
		<AuthFormLayout links="register">
      <RegisterForm />
		</AuthFormLayout>
	);
};

export default RegisterPage;
