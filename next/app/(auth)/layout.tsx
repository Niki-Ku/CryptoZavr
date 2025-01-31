import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full min-h-[100svh] bg-background-main text-text-primary md:flex">
			<div className="md:m-auto md:mt-20 md:w-[420px] min-h-[500px] md:border md:border-background-component md:rounded-3xl p-8">
				{/* replace with logo component */}
				<div className="text-3xl">CryptoZavr</div>
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
