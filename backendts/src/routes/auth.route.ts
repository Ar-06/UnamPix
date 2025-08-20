import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyToken,
} from "../controllers/auth.controller.ts";
import { registerSchema, loginSchema } from "../schemas/auth.schema.ts";
import { validateSchema } from "../middleware/validateSchema.ts";

export const RouterAuth = Router();

RouterAuth.post("/register", validateSchema(registerSchema), register);
RouterAuth.post("/login", validateSchema(loginSchema), login);
RouterAuth.post("/logout", logout);
RouterAuth.get("/verify", verifyToken);
