import dotenv from "dotenv";
import { startServer } from "./socket.ts";
dotenv.config();

const PORT = process.env.PORT!;

startServer(PORT);
