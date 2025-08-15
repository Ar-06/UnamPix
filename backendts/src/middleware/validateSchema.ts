import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

export const validateSchema =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message);
        res.status(400).json({ errors: messages });
      } else {
        res.status(500).json({ message: "Error interno del servidor" });
      }
    }
  };
