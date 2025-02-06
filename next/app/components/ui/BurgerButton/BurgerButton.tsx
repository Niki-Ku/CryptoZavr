const BurgerButton = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			aria-label="Menu"
			onClick={onClick}
			className="w-full h-full aspect-square"
		>
			<div className="w-full h-full relative">
				<span
					className={`absolute bg-text-primary w-full h-[3px] top-0 left-0 transition-transform duration-350 ease-out ${
						isOpen ? "top-[48%] -rotate-45" : ""
					}`}
				></span>
				<span
					className={`absolute bg-text-primary w-full h-[3px] top-[48%] left-0 ${
						isOpen ? "hidden" : ""
					}`}
				></span>
				<span
					className={`absolute bg-text-primary w-full h-[3px] bottom-0 left-0 transition-transform duration-350 ease-out ${
						isOpen ? "top-[48%] rotate-45" : ""
					}`}
				></span>
			</div>
		</button>
	);
};

export default BurgerButton;
