import { ReactNode } from "react";
import "./globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
};

export default Layout;
