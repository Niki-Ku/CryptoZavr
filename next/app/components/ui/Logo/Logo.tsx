import Link from "next/link";

const Logo = ({ isLink = false }: { isLink?: boolean }) => {
	return (
		<div className="text-white">
			{isLink ? (
				<Link
					aria-label="Logo"
					href="/"
					className="font-bold inline-block text-2xl my-4 md:m-0"
				>
					CryptoZavr
				</Link>
			) : (
				<span
					aria-label="Logo"
					className="font-bold inline-block text-2xl my-4 md:m-0"
				>
					CryptoZavr
				</span>
			)}
		</div>
	);
};

export default Logo;
