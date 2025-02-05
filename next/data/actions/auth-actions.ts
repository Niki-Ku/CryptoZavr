"use server";
import { z } from "zod";

// make type from this schema
const schemaRegister = z
	.object({
		userName: z.string().min(3).max(20, {
			message: "Username must be between 3 and 20 characters",
		}),
		email: z.string().email({
			message: "Please enter a valid email adress",
		}),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(32, "Password must be at most 32 characters long")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must include at least one uppercase letter, one lowercase letter, and one number"
			),
		passwordRepeat: z.string(),
	})
  .refine((data) => { console.log(data); return data.password === data.passwordRepeat}, {
		message: "Passwords do not match",
		path: ["passwordRepeat"],
	});

export const registerUserAction = async (
	prevState: any,
	formData: FormData
) => {
	// console.log(formData)
	const validatedFields = schemaRegister.safeParse({
		userName: formData.get("userName"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordRepeat: formData.get("passwordRepeat"),
	});
	// Kfj4@li985jk
	// Kfj4@li985jk
	// console.log(formData.get("password"), formData.get("passwordRepeat"));

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to register",
		};
	}

	return {
		...prevState,
		data: "ok",
	};
};
