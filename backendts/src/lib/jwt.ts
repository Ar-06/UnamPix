import dotenv from "dotenv";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AccessTokenPayload extends JwtPayload {
  idUsuario: string;
  nombres: string;
}

export function createAccessToken(
  payload: AccessTokenPayload,
  options: SignOptions = { expiresIn: "1h" }
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET as string, options, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
}

export function verifyAccessToken(
  token: string
): Promise<jwt.JwtPayload & { idUsuario: string; nombres: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded !== "object") return reject(err);

      resolve(
        decoded as jwt.JwtPayload & { idUsuario: string; nombres: string }
      );
    });
  });
}
