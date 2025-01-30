import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				/* 
          REMOVE IN THE END!
          Background: bg-background-main or bg-background-component
          Text: text-text-primary or text-text-secondary
          Buttons/Links: bg-accent-primary, hover:bg-accent-hover, active:bg-accent-clicked
          Status: text-feedback-success, text-feedback-warning, text-feedback-error
         */
				background: {
					main: "#F2F6FA", // Main background
					component: "#E3EDF4", // Component background
				},
				text: {
					primary: "#1C2B36", // Primary text
					secondary: "#4A6073", // Secondary text
				},
				accent: {
					primary: "#1e587c", // Base color for buttons/links
					hover: "#3F7FAE", // Hover state
					clicked: "#17425C", // Clicked state
				},
				complementary: {
					coral: "#DA6851", // Secondary accent
				},
				feedback: {
					success: "#2F8F65", // Success
					warning: "#F4A259", // Warning
					error: "#D9534F", // Error
				},
			},
		},
	},
	plugins: [],
};

export default config;
