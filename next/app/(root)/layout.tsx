import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const footerConfig = createPopulateConfig(["footer"], {
		footer: ["logoText", "navigationLinks", "socialLinks"],
	});
	const url = createStrapiUrl("/api/global", footerConfig);
	const data = await getStrapiData(url);

	return (
		<div className="min-h-[100svh] grid grid-rows-[auto_1fr_auto] w-full">
			<div>Header</div>
			{children}
			<Footer data={data.data.footer} />
		</div>
	);
};

export default RootLayout;
