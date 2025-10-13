import jwt from "jsonwebtoken";
import { UserRole } from "@/types/auth-types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type DecodedToken = {
  id: string;
  role: UserRole;
  exp: number;
};

export async function isAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) return redirect("/login");

  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded?.role || null;
  } catch {
    return null;
  }
}
