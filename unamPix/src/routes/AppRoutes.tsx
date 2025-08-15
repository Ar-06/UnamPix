import { AuthProvider } from "@/context/auth/AuthProvider";
import { PublicsProvider } from "@/context/publics/PublicationsProvider";
import { Publication } from "@/pages/Publication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Galería } from "../pages/Gallery";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PublicsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galeria" element={<Galería />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createPublication" element={<Publication />} />
          </Routes>
        </PublicsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
