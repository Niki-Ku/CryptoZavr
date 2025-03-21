import Link from "next/link";
import { ILink } from "@/types/types";
import { ReactNode } from "react";

const CustomLink: React.FC<{
	linkData: ILink;
	className?: string;
	children?: ReactNode;
}> = ({ linkData, className, children }) => {
	const { isExternal, url, text } = linkData;

	if (isExternal)
		return (
			<a
				href={`https://${url}`}
				className={`text-text-primary hover:text-complementary-coral ${className}`}
				target="blank"
			>
				{children ? children : text}
			</a>
		);

	return (
		<Link
			href={url}
			className={`text-text-primary hover:text-complementary-coral ${className}`}
		>
			{children ? children : text}
		</Link>
	);
};

export default CustomLink;
