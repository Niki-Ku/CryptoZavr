import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";

const getStrapiData = async (path: string) => {
	const baseUrl = "http://localhost:1337";
	try {
		const response = await fetch(baseUrl + path);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

const RootLayout = async({ children }: { children: ReactNode }) => {
	const data = await getStrapiData('/api/global?populate[0]=footer.logoText&populate[1]=footer.navigationLinks&populate[2]=footer.socialLinks')
	return (
		<div className="min-h-[100svh] grid grid-rows-[auto_1fr_auto] w-full">
			<div>Header</div>
			{children}
			<Footer data={data.data.footer} />
		</div>
	);
};

export default RootLayout;
