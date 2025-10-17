import jwt from "jsonwebtoken";

type JwtPayload = {
  iat: number;
  exp: number;
};

export const decodeToken = (token: string) => jwt.decode(token) as JwtPayload;

const getRemainingTime = (token: string) => {
  try {
    const decoded = decodeToken(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp - now; // seconds left
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getRemainingTime };
