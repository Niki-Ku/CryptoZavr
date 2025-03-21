import { z } from "zod";

export const schemaRegister = z
	.object({
		email: z.string().trim().email({
			message: "Please enter a valid email adress",
		}),
		username: z.string().min(3).max(32),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters long")
			.max(32, "Password must be at most 32 characters long")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must include at least one uppercase letter, one lowercase letter, and one number"
			),
		passwordRepeat: z.string().trim(),
	})
	.refine(
		(data) => {
			return data.password === data.passwordRepeat;
		},
		{
			message: "Passwords do not match",
			path: ["passwordRepeat"],
		}
	);

export type schemaRegisterType = z.output<typeof schemaRegister>;

export const schemaLogin = z.object({
	identifier: z
		.string()
		.min(3, {
			message: "Identifier must have at least 3 or more characters",
		})
		.max(20, {
			message: "Please enter a valid username or email address",
		}),
	password: z
		.string()
		.min(6, {
			message: "Password must have at least 6 or more characters",
		})
		.max(100, {
			message: "Password must be between 6 and 100 characters",
		}),
});

export const schemaPassword = z.object({
	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters long")
		.max(32, "Password must be at most 32 characters long")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must include at least one uppercase letter, one lowercase letter, and one number"
		)
});
