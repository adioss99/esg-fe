import { cookies } from "next/headers";
import { UserRole } from "@/types/auth-types";
import { redirect } from "next/navigation";
import { decodeToken } from "@/lib/jwt";

type DecodedToken = {
  id: string;
  role: UserRole;
  exp: number;
};

export async function IsAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) return redirect("/login");

  try {
    const decoded = decodeToken(token) as unknown as DecodedToken;
    return decoded?.role || null;
  } catch {
    return null;
  }
}
