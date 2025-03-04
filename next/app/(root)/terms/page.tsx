import {
	createPopulateConfig,
	createStrapiUrl,
	getStrapiData,
} from "@/utils/strapiUtils";

const Terms = async () => {
  const footerConfig = createPopulateConfig(["footer", "logo", "header"], {
		footer: ["navigationLinks", "socialLinks"],
		logo: true,
		header: ["loggedInLinks", "loggedOutLinks"],
	});
	const url = createStrapiUrl("/api/terms-page", footerConfig);
	// const data = await getStrapiData(url);
  const data = await getStrapiData("/api/terms-page");
  console.log(data.data.heading)
  console.log(data.data)
  return (
    <div>
      <h2>{data.data.heading}</h2>
      <p>{data.data.description}</p>
    </div>
  )
}

export default Terms;
