import Logo from "../../ui/Logo/Logo";
import Link from "next/link";

const AuthFormLayout = ({
	children,
	links,
}: {
	children: React.ReactNode;
	links?: "register" | "login";
}) => {
	return (
		<div className="p-8 md:m-auto md:mt-16 md:w-[420px]">
			<div className="min-h-[500px] md:border md:border-background-border md:rounded-3xl py-8 md:px-8">
				<Logo />
				{children}
			</div>
			<div className="md:text-center my-2 underline text-complementary-coral">
				{links === "register" ? (
					<Link href="/login">Login</Link>
				) : links === "login" ? (
					<Link href="/register">Register an account</Link>
				) : null}
			</div>
		</div>
	);
};

export default AuthFormLayout;
