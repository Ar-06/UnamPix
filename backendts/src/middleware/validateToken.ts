import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/jwt.ts";
dotenv.config();

export const authRequires = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const payload = await verifyAccessToken(token);

    req.user = payload;
    return next();
  } catch (error: any) {
    res.status(401).json({ msg: "Token inválido" });
    return;
  }
};
