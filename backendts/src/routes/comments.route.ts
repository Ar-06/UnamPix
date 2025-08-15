import { Router } from "express";
import { getCommentsByPublic } from "../controllers/comments.controller.ts";
import { authRequires } from "../middleware/validateToken.ts";

export const RouterComments = Router();

RouterComments.get("/:idPublicacion", authRequires, getCommentsByPublic);
