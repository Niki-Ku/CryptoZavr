import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<h1>some content</h1>
			<div>{children}</div>
			<h1>some more content</h1>
		</div>
	);
};

export default AuthLayout;
