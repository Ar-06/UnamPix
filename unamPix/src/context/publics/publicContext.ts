import { createContext } from "react";
import { type PublicContextType } from "@/types/publicProvider";

export const PublicsContext = createContext<PublicContextType | undefined>(
  undefined
);
