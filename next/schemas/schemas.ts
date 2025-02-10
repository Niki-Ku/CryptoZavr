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
