import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";
import { ITerms, ITermsText, ITextChildren } from "@/types/types";

const Terms = async () => {
	const termsConfig = createPopulateConfig(["terms"], {
		terms: true,
	});
	const url = createStrapiUrl("/api/terms-page", termsConfig);
	const data = await getStrapiData(url);
	return (
		<div className="p-8 text-white bg-background-main">
			<h2 className="text-2xl mb-4">{data.data.heading}</h2>
			<p className="font-light">{data.data.description}</p>
			<ol className="mt-6">
				{data.data.terms.map((e: ITerms) => (
					<li key={e.id} className="mb-6 text-lg">
						{e.subheading}
						<hr className="mb-2" />
						<ol className="text-base font-light">
						{e.termsText.flatMap((t: ITermsText, i : number) =>
								t.children.map((child: ITextChildren) => (
									<li key={e.id + "list" + i}>{child.text}</li>
								))
							)}
						</ol>
					</li>
				))}
			</ol>
		</div>
	);
};

export default Terms;
