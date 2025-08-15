import { useContext } from "react";
import { PublicsContext } from "./publicContext";

export const usePublication = () => {
  const context = useContext(PublicsContext);
  if (!context) {
    throw new Error("usePublication debe usarse dentro de un PublicsProvider");
  }
  return context;
};
