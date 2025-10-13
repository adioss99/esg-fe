import jwt from "jsonwebtoken";

type JwtPayload = {
  iat: number;
  exp: number;
};

const getRemainingTime = (token: string) => {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp - now; // seconds left
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export { getRemainingTime };
