import Link from "next/link";

const Logo = ({ isLink = false }: { isLink?: boolean }) => {
	return (
		<div>
			{isLink ? (
				<Link
					aria-label="Logo"
					href="/"
					className="font-bold text-2xl mt-10 mb-6 md:m-0"
				>
					CryptoZavr
				</Link>
			) : (
				<span
					aria-label="Logo"
					className="font-bold text-2xl mt-10 mb-6 md:m-0"
				>
					CryptoZavr
				</span>
			)}
		</div>
	);
};

export default Logo;
