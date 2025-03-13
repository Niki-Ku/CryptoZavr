import { ReactNode } from "react";
import Providers from "@/providers/providers";
import "./globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body className="w-full h-full">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default Layout;
