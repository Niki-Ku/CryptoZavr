interface ICustomDropdown {
	text: string;
	children: React.ReactNode;
	className?: string;
	isOpen: boolean;
	onClick: () => void;
}

// add arrow down icon here

const CustomDropdown: React.FC<ICustomDropdown> = ({
	children,
	text,
	className,
	isOpen,
	onClick,
}) => {
	return (
		<div
			className={`bg-background-border rounded-md p-[0.75px] relative ${className}`}
		>
			<div className="bg-background-component rounded-md p-2 ">
				<button
					aria-expanded={isOpen}
					onClick={onClick}
					type="button"
					className="w-full flex justify-between"
				>
					<span>{text}</span>
					<span>Icon</span>
				</button>
				{isOpen && (
					<div className="absolute bg-background-component w-full left-0 -top-100 border border-background-border rounded-md border-t-0 rounded-t-none">
						{children}
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomDropdown;
