import CustomLink from "../CustomLink/CustomLink";

const Header = () => {
  const logged = true;
  // temporary here
	const links1 = [
		{ url: "/", text: "Log In", isExternal: false, id: 245 },
		{ url: "/", text: "Register", isExternal: false, id: 2435 },
	];
	const links2 = [
		{ url: "/", text: "Account", isExternal: false, id: 245 },
		{ url: "/", text: "Wallet", isExternal: false, id: 2435 },
		{ url: "/", text: "Trade", isExternal: false, id: 24325 },
		{ url: "/", text: "Log out", isExternal: false, id: 242235 },
	];
	const renderLinks = logged ? links2 : links1;
	return (
		<nav className="flex w-full justify-between">
			<div>Logo</div>
			<ul>
				{renderLinks.map((l) => (
					<li key={l.id}>
						<CustomLink
							linkData={{
								url: "/",
								text: "Log In",
								isExternal: false,
								id: 245,
							}}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Header;
