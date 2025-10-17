import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "refreshToken",
    value: token,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return res;
}
