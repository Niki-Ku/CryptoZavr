"use client";
import { useEffect, useState } from "react";
import CustomLink from "@/app/components/ui/CustomLink/CustomLink";
import "./Header.css";
import BurgerButton from "@/app/components/ui/BurgerButton/BurgerButton";
import { ILink } from "@/types/types";
import Logo from "../../ui/Logo/Logo";
import CustomButton from "../../ui/CustomButton/CustomButton";
import { logoutAction } from "@/data/actions/auth-actions";

interface IHeader {
	data: {
		loggedInLinks: ILink[];
		loggedOutLinks: ILink[];
	};
	isLoggedIn: boolean;
}

const Header: React.FC<IHeader> = ({ data, isLoggedIn }) => {
	const renderLinks = isLoggedIn ? data.loggedInLinks : data.loggedOutLinks;
	const [isOpen, setIsOpen] = useState(false);
	const onBurgerClick = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		const bodyClass = document.body.classList;
		isOpen
			? bodyClass.add("overflow-hidden")
			: bodyClass.remove("overflow-hidden");
	}, [isOpen]);

	return (
		<nav className="z-50 px-8 fixed top-0 left-0 w-full md:h-auto md:flex justify-between items-between bg-background-component">
			<Logo isLink />
			<div className="absolute z-50 w-8 right-4 top-4 md:hidden">
				<BurgerButton isOpen={isOpen} onClick={onBurgerClick} />
			</div>
			<ul
				className={`
          absolute top-0 left-0 bg-background-component h-[100svh] w-full flex items-center justify-center flex-col gap-10 md:gap-5
          md:static md:flex-row md:h-auto md:justify-end 
          translate-x-full md:translate-x-0 duration-350 ease-out transition-transform
          ${isOpen ? "header" : ""} 
      `}
			>
				{renderLinks.map((l) => (
					<li
						key={l.id}
						className="text-2xl md:text-xl"
						onClick={() => {
							setIsOpen(false);
							window.scrollTo({ top: 0 });
						}}
					>
						<CustomLink linkData={l} />
					</li>
				))}
				{isLoggedIn && (
					<form action={logoutAction} className="text-2xl md:text-xl">
						<CustomButton type="submit">Log out</CustomButton>
					</form>
				)}
			</ul>
		</nav>
	);
};

export default Header;
