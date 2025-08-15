import { getPublics } from "@/api/publics";
import type { Publics } from "@/types/public";
import type { PublicProviderProps } from "@/types/publicProvider";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { PublicsContext } from "./publicContext";

export const PublicsProvider = ({ children }: PublicProviderProps) => {
  const [publications, setPublications] = useState<Publics[]>([]);
  const [filterPublications, setFilterPublications] = useState<Publics[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const clearErrors = () => setErrors([]);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const data = await getPublics();
        setPublications(data);
        setFilterPublications(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error || "Error desconocido";
          setErrors([errorMsg]);
        } else {
          setErrors(["Algo salió mal"]);
        }
      } finally {
        setLoading(false);
      }
    };
    loadPublications();
  }, []);

  return (
    <PublicsContext.Provider
      value={{ errors, loading, clearErrors, filterPublications }}
    >
      {children}
    </PublicsContext.Provider>
  );
};
