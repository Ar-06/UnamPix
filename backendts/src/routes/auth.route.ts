import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.ts";
import { registerSchema, loginSchema } from "../schemas/auth.schema.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { authRequires } from "../middleware/validateToken.ts";

export const RouterAuth = Router();

RouterAuth.post("/register", validateSchema(registerSchema), register);
RouterAuth.post("/login", validateSchema(loginSchema), login);
RouterAuth.post("/logout", logout);
RouterAuth.get("/profile", authRequires, profile);
RouterAuth.get("/verify", verifyToken);
