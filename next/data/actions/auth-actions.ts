"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerUserService, loginUserService } from "../services/auth-service";
import { schemaRegister, schemaLogin } from "@/schemas/schemas";

const config = {
	maxAge: 60 * 60 * 24 * 7, // 1 week
	path: "/",
	domain: process.env.HOST ?? "localhost",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
};

export const registerUserAction = async (
	prevState: any,
	formData: FormData
) => {
	const validatedFields = schemaRegister.safeParse({
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
		passwordRepeat: formData.get("passwordRepeat"),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			strapiErrors: null,
			message: "Missing fields. Failed to register",
		};
	}

	const { passwordRepeat, ...validatedData } = validatedFields.data;
	const responseData = await registerUserService(validatedData);

	if (!responseData) {
		return {
			...prevState,
			zodErrors: null,
			strapiErrors: null,
			message: "Ops! Something went wrong. Please try again",
		};
	}

	if (responseData.error) {
		return {
			...prevState,
			zodErrors: null,
			strapiErrors: responseData.error,
			message: "Failed to register",
		};
	}

	cookies().set("jwt", responseData.jwt, config);
	redirect("/");
};

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
	});
	
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);
	
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  console.log(responseData, "responseData");

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}