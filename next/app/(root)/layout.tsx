import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const footerConfig = createPopulateConfig(["footer", "logo"], {
		footer: ["navigationLinks", "socialLinks"],
		logo: true,
	});
	const url = createStrapiUrl("/api/global", footerConfig);
	const data = await getStrapiData(url);

	return (
		<div className="min-h-[100svh] grid grid-rows-[auto_1fr_auto] w-full">
			<div>Header</div>
			{children}
			<Footer data={data.data.footer} logo={data.data.logo} />
		</div>
	);
};

export default RootLayout;
