type CustomButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "complementary";
	className?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
	className,
	variant = "primary",
	...props
}) => {
	const styles = {
		primary: "bg-accent-primary hover:bg-accent-hover",
		secondary: "border border-accent-primary border-2 hover:border-accent-hover",
    complementary: "bg-complementary-coral hover:opacity-50",
	};

	return (
		<button
			{...props}
			className={`py-2 px-4 rounded-md font-semibold ${className} ${
				variant && styles[variant]
			}`}
		></button>
	);
};

export default CustomButton;
