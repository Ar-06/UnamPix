import {
  createPublics,
  getPublicOne,
  getPublics,
  getPublicsByUser,
} from "@/api/publics";
import type { Publics } from "@/types/public";
import type { PublicProviderProps } from "@/types/publicProvider";
import { toast } from "@pheralb/toast";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { PublicsContext } from "./publicContext";

export const PublicsProvider = ({ children }: PublicProviderProps) => {
  const [publications, setPublications] = useState<Publics[]>([]);
  const [publicationUser, setPublicationsUser] = useState<Publics[]>([]);
  const [filterPublications, setFilterPublications] = useState<Publics[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUserPublications, setLoadingUserPublications] = useState(false);
  const [createdPublication, setCreatedPublication] = useState(false);
  const [loadingPublic, setLoadingPublic] = useState(false);
  const [publicationOne, setPublicationOne] = useState<Publics | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { isAuthenticated, user, loading: authLoading } = useAuth();

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

  useEffect(() => {
    const loadPublicationsByUser = async () => {
      if (authLoading) return;

      setPublicationsUser([]);
      setLoading(true);
      setErrors([]);

      if (isAuthenticated && user?.idUsuario) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));

          const data = await getPublicsByUser({ idUsuario: user?.idUsuario });
          if (Array.isArray(data)) {
            setPublicationsUser(data);
          } else if (data.publications) {
            setPublicationsUser(data.publications);
          } else {
            setPublicationsUser([]);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 500) {
              const errorMsg =
                error.response?.data?.error || "Error del servidor";
              setErrors([errorMsg]);
              toast.error({ text: errorMsg });
            }
          } else {
            console.error("Error inesperado:", error);
          }
          setPublicationsUser([]);
        } finally {
          setTimeout(() => {
            setLoadingUserPublications(false);
          }, 500);
        }
      } else {
        setPublicationsUser([]);
        setTimeout(() => {
          setLoadingUserPublications(false);
        }, 500);
      }
    };
    loadPublicationsByUser();
  }, [isAuthenticated, user, authLoading]);

  const createPublic = async (data: FormData) => {
    try {
      setErrors([]);
      setCreatedPublication(true);

      const createRes = await createPublics(data);

      setPublications([...publications, createRes.publicacion]);
      setFilterPublications([...publications, createRes.publicacion]);
      setPublicationsUser([...publicationUser, createRes.publicacion]);

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
      setCreatedPublication(false);
    }
  };

  const fetchPublicOne = useCallback(async (idPublicacion: string) => {
    if (!idPublicacion) {
      setErrors(["ID no válido"]);
      return;
    }

    setLoadingPublic(true);
    setErrors([]);

    try {
      const data = await getPublicOne({ idPublicacion });
      setPublicationOne(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Error del servidor";
        setErrors([errorMsg]);
        toast.error({ text: errorMsg });
      } else {
        console.error("Error inesperado:", error);
      }
    } finally {
      setLoadingPublic(false);
    }
  }, []);

  const initialUsers = () => {
    let initials = "";
    if (publicationOne?.nombres) {
      const nameParts = publicationOne.nombres.split(" ");
      initials = nameParts
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    }
    return initials;
  };

  return (
    <PublicsContext.Provider
      value={{
        errors,
        loading,
        loadingUserPublications,
        loadingPublic,
        createdPublication,
        clearErrors,
        filterPublications,
        publicationUser,
        publicationOne,
        fetchPublicOne,
        createPublic,
        initialUsers
      }}
    >
      {children}
    </PublicsContext.Provider>
  );
};
