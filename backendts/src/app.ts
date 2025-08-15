import express, { type Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middleware/cors.ts";
import { RouterAuth } from "./routes/auth.route.ts";
import { RouterComments } from "./routes/comments.route.ts";
import { RouterPublics } from "./routes/publicactions.route.ts";

export const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware());

app.use("/auth", RouterAuth);
app.use("/comments", RouterComments);
app.use("/publics", RouterPublics);

app.get("/", (res: Response) => {
  res.send("Servidor UnamPix activo");
});
