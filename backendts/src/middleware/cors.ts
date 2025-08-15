import cors from "cors";

const ACCEPTED_ORIGIN = ["http://localhost:5173", "http://localhost:3000"];

interface CorsConfig {
  acceptedOrigin?: string[];
}

export const corsMiddleware = ({
  acceptedOrigin = ACCEPTED_ORIGIN,
}: CorsConfig = {}): ReturnType<typeof cors> => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigin.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  });
};
