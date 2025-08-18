import { createPublics, getPublics } from "@/api/publics";
import type { Publics } from "@/types/public";
import type { PublicProviderProps } from "@/types/publicProvider";
import { toast } from "@pheralb/toast";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicsContext } from "./publicContext";

export const PublicsProvider = ({ children }: PublicProviderProps) => {
  const [publications, setPublications] = useState<Publics[]>([]);
  const [filterPublications, setFilterPublications] = useState<Publics[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const clearErrors = () => setErrors([]);
  const navigate = useNavigate();

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

  const createPublic = async (data: FormData) => {
    try {
      setErrors([]);
      setLoading(true);

      const createRes = await createPublics(data);

      setPublications([...publications, createRes.publicacion]);
      setFilterPublications([...publications, createRes.publicacion]);
      navigate("/galeria", { replace: true });
      toast.success({ text: "Publicación creada correctamente" });
    } catch (error) {
      console.error("Error completo:", error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getErrorMessage = (err: any): string => {
        const data = err.response?.data;

        if (data?.message) return data.message;
        if (data?.error) return data.error;
        if (Array.isArray(data?.errors) && data.errors.length > 0)
          return data.errors[0];

        return "Error desconocido";
      };

      const errorMsg = getErrorMessage(error);
      setErrors([errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicsContext.Provider
      value={{ errors, loading, clearErrors, filterPublications, createPublic }}
    >
      {children}
    </PublicsContext.Provider>
  );
};
