import { ReactNode } from "react";
import Footer from "../components/layout/Footer/Footer";
import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";
import Header from "../components/layout/Header/Header";

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const footerConfig = createPopulateConfig(["footer", "logo", "header"], {
		footer: ["navigationLinks", "socialLinks"],
		logo: true,
		header: ["loggedInLinks", "loggedOutLinks"],
	});
	const url = createStrapiUrl("/api/global", footerConfig);
	const data = await getStrapiData(url);
	return (
		<div className="min-h-[100svh] grid grid-rows-[1fr_auto] w-full mt-16">
			<Header isLoggedIn={true} data={data.data.header} />
			{children}
			<Footer data={data.data.footer} logo={data.data.logo} />
		</div>
	);
};

export default RootLayout;
