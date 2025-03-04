import { ReactNode } from "react";
import "./globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<html>
			<body className="w-full h-full">{children}</body>
		</html>
	);
};

export default Layout;
