// import { cookies } from "next/headers";

// export async function setRefreshCookie(token: string) {
//   const cookieStore = await cookies();
//   cookieStore.set("refreshTokens", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: true,
//     maxAge: 7 * 24 * 60 * 60,
//   });
// }

// export async function deleteRefreshCookie() {
//   const cookieStore = await cookies();
//   cookieStore.delete("refreshTokens");
// }
