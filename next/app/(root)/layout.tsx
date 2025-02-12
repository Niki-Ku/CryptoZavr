import { ReactNode } from "react";
import Footer from "../components/layout/Footer/Footer";
import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";
import Header from "../components/layout/Header/Header";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const footerConfig = createPopulateConfig(["footer", "logo", "header"], {
		footer: ["navigationLinks", "socialLinks"],
		logo: true,
		header: ["loggedInLinks", "loggedOutLinks"],
	});
	const url = createStrapiUrl("/api/global", footerConfig);
	const data = await getStrapiData(url);
	const user = await getUserMeLoader();
	return (
		<div className="min-h-[100svh] grid grid-rows-[1fr_auto] w-full mt-16">
			<Header isLoggedIn={user.ok} data={data.data.header} />
			{children}
			<Footer data={data.data.footer} logo={data.data.logo} />
		</div>
	);
};

export default RootLayout;
