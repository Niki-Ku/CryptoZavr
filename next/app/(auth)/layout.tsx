import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full min-h-[100svh] bg-background-main text-text-primary md:flex">
			{children}
		</div>
	);
};

export default AuthLayout;
