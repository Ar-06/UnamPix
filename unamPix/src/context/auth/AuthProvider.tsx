import { toast } from "@pheralb/toast";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyToken,
} from "../../api/auth";
import type { AuthProviderProps } from "../../types/authProvider";
import type { LoginUser, User } from "../../types/user";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const clearErrors = () => setErrors([]);
  const navigate = useNavigate();

  const register = async (data: User) => {
    try {
      setLoading(true);
      setErrors([]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const registerRes = await registerRequest(data);

      const profileRes = await verifyToken();
      setUser(profileRes.data);
      setIsAuthenticated(true);

      navigate("/galeria", { replace: true });
      toast.success({ text: "¡Registro exitoso! Bienvenido 😎" });
    } catch (error) {
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

  const login = async (data: LoginUser) => {
    try {
      setLoading(true);
      setErrors([]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loginRes = await loginRequest(data);

      const profileRes = await verifyToken();
      setUser(profileRes.data);
      setIsAuthenticated(true);

      navigate("/galeria", { replace: true });
      toast.success({ text: "Bienvenido de nuevo 😎" });
    } catch (error) {
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

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error en logout", error);
    } finally {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      setErrors([]);
      navigate("/galeria", { replace: true });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await verifyToken();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const initialUsers = () => {
    let initials = "";
    if (user?.nombres) {
      const nameParts = user.nombres.split(" ");
      initials = nameParts
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    }
    return initials;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        errors,
        clearErrors,
        register,
        login,
        logout,
        initialUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
