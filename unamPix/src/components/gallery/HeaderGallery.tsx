import { useAuth } from "@/context/auth/useAuth";
import {
  Camera,
  Download,
  Filter,
  Heart,
  LogOut,
  Search,
  UserCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DropdownMenuContent, DropdownMenuLabel } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const categories = [
  "Todos",
  "Académico",
  "Eventos",
  "Deportes",
  "Cultural",
  "Social",
];

export const HeaderGallery = () => {
  const { isAuthenticated, initialUsers, loading, user, logout } = useAuth();
  const [selectCategory, setSelectedCategory] = useState("Todos");

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-gray-500">Cargando sesión...</p>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Galería UnamPix
            </h1>
            <p className="text-gray-600 mt-1">
              Descubre los mejores momentos universitarios
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 to hover:to-indigo-700 cursor-pointer">
                  Subir Foto
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="relative h-10 w-10 rounded-full border-b bg-gradient-to-r from-blue-600 to-indigo-600 font-bold hover:from-blue-700 to hover:to-indigo-700 cursor-pointer">
                      {initialUsers()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.nombres} {user?.apellidos}
                        </p>
                        <p className="text-xs leadin-none text-muted-foreground">
                          {user?.idUsuario}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Mi perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Mis Fotos favoritas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Mis Subidas</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-400 hover:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                to="/register"
                className="flex items-center border-blue-200 border-2 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 bg-transparent"
              >
                <Camera className="h-5 w-5 mr-2" />
                ¿Quieres compartir tu primera foto? Unete!
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 text-gray-400 h-4 w-4 top-1/2 transform -translate-y-1/2 " />
            <Input placeholder="Buscar fotos, etiquetas..." className="pl-10" />
          </div>

          <div className="flex gap-2 items-center">
            <Filter className="text-gray-500 h-4 w-4" />
            <Select value={selectCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};
