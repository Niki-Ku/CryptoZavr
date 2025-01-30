import qs from "qs";

type PopulateConfigType = Record<
	string,
	Record<string, Record<string, boolean> | string[] | boolean>
>;

export const createStrapiUrl = (
	endpoint: string,
	config: PopulateConfigType
) => {
	const query = qs.stringify(
		{
			populate: config,
		},
		{
			encodeValuesOnly: true,
		}
	);

	return `${endpoint}?${query}`;
};

export const createPopulateConfig = (
	fields: string[],
	nestedFields?: { [key: string]: string[] | boolean }
): PopulateConfigType => {
	const config: PopulateConfigType = {};

	fields.forEach((field) => {
		config[field] = {};

		if (nestedFields && nestedFields[field]) {
			config[field].populate = nestedFields[field];
		}
	});

	return config;
};

export const getStrapiData = async (path: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await fetch(`${baseUrl}` + path);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
