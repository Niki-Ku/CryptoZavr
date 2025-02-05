interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode;
	onIconClick?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
	icon,
	onIconClick,
	className,
	...props
}) => {
	return (
		<div className="relative w-full">
			{/* Input Field */}
			<input
				{...props}
				className={`w-full px-4 py-2 border border-background-border bg-transparent rounded-md focus:border-accent-hover hover:border-accent-hover focus:outline-none ${
					icon ? "pr-10" : ""
				} ${className}`}
			/>

			{/* Right Icon (Optional) */}
			{icon && (
				<button
					type="button"
					onClick={onIconClick}
					className="absolute right-3 top-1/2 -translate-y-1/2"
				>
					{icon}
				</button>
			)}
		</div>
	);
};

export default CustomInput;
