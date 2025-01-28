import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="min-h-[100svh] grid grid-rows-[auto_1fr_auto]">
			<div>Header</div>
			{children}
			<Footer />
		</div>
	);
};

export default RootLayout;
