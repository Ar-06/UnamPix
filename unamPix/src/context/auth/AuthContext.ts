import { createContext } from "react";
import type { AuthContextType } from "../../types/authProvider";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
