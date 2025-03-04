import CustomLink from "../../ui/CustomLink/CustomLink";
import Image from "next/image";
import { socialIcons } from "@/lib/icons";
import { ILink } from "@/types/types";
import { Fragment } from "react";

// should I store this interface here or place it into types?
interface IFooter {
	data: {
		id: number;
		navigationLinks: ILink[];
		socialLinks: ILink[];
	};
	logo: ILink;
}

const Footer: React.FC<IFooter> = ({ data, logo }) => {
	const { navigationLinks, socialLinks } = data;
	return (
		<footer
			aria-label="Footer"
			className="bg-background-component text-text-primary w-full"
		>
			<div className="text-center p-4 md:p-8 md:py-20 md:gap-3 flex flex-col md:flex-row md:justify-between md:items-center mx-auto max-w-[1420px]">
				{/* change it to link or create seperate logo component */}
				<h2 className="font-bold text-2xl mt-10 mb-6 md:m-0">{logo.text}</h2>
				{/* should I make seperate component out of it? */}
				<div className="flex flex-col gap-3 text-lg md:flex-row">
					{navigationLinks.map((link) => (
						<Fragment key={link.id}>
							<CustomLink linkData={link} />
						</Fragment>
					))}
				</div>
				{/* should I make seperate component out of it? */}
				<div className="flex justify-center my-12 gap-2 md:m-0">
					{socialLinks.map((link) => (
						<Fragment key={link.id}>
							<CustomLink linkData={link}>
								<Image
									src={socialIcons[link.text.toLowerCase()]}
									alt={link.text}
									className="w-8 h-8"
								/>
							</CustomLink>
						</Fragment>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
