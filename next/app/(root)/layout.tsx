import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="min-h-[100svh] grid grid-rows-[auto_1fr_auto]">
			<div>Header</div>
			{children}
			<div>Footer</div>
		</div>
	);
};

export default RootLayout;
