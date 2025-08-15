import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/jwt.ts";
dotenv.config();

export const authRequires = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1]!;

  try {
    const payload = await verifyAccessToken(token);

    req.user = payload;
    return next();
  } catch (error: any) {
    res.status(401).json({ msg: "Token inválido" });
    return;
  }
};
