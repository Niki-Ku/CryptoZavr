import { cookies } from "next/headers";

export const getAuthToken = async() => {
  const authToken = cookies().get("jwt")?.value;
  return authToken;
}