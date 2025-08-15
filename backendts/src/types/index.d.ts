import type { FileArray } from "express-fileupload";
import type { AccessTokenPayload } from "../lib/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
      files?: FileArray;
    }
  }
}

export {};
