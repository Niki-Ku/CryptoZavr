import AuthFormLayout from "@/app/components/layout/AuthFormLayout/AuthFormLayout";
import ErrorMessage from "@/app/components/ui/ErrorMessage/ErrorMessage";
const RegisterPage = () => {
  return <AuthFormLayout links="register">
    <ErrorMessage error="askldf" />
    Register form</AuthFormLayout>;
};

export default RegisterPage;
