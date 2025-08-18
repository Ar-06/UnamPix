import { Router } from "express";
import {
  createPublic,
  getPublications,
  updatePublics,
  deletePublic,
  getPublicsByUser,
} from "../controllers/publics.controller.ts";

import { authRequires } from "../middleware/validateToken.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { createPublics } from "../schemas/publications.schema.ts";
import fileUpload from "express-fileupload";

export const RouterPublics = Router();

RouterPublics.post(
  "/create",
  authRequires,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  validateSchema(createPublics),
  createPublic
);

RouterPublics.get("/", getPublications);
RouterPublics.delete("/:idPublicacion/delete", authRequires, deletePublic);
RouterPublics.patch(
  "/:idPublicacion/update",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  authRequires,
  updatePublics
);

RouterPublics.get("/:idUsuario", authRequires, getPublicsByUser);
