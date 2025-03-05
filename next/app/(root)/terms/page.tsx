import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";

interface Terms {
	id: string;
	subheading: string;
	termsText: TermsText[];
}

interface TermsText {
	type: string;
	children: TextChildren[];
}

interface TextChildren {
	type: string;
	text: string;
}

// move interfaces to types file

const Terms = async () => {
	const termsConfig = createPopulateConfig(["terms"], {
		terms: true,
	});
	const url = createStrapiUrl("/api/terms-page", termsConfig);
	const data = await getStrapiData(url);
	return (
		<div className="p-8 text-white bg-background-main">
			<h2 className="text-2xl mb-4">{data.data.heading}</h2>
			<p>{data.data.description}</p>
			<ol className="mt-6">
				{data.data.terms.map((e: Terms) => (
					<li key={e.id} className="mb-6 text-lg">
						{e.subheading}
						<hr className="mb-2" />
						<ol className="text-base font-light">
							{e.termsText.map((t: TermsText, i: number) => (
								<li key={e.id + "list" + i}>{t.children[0].text}</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</div>
	);
};

export default Terms;
