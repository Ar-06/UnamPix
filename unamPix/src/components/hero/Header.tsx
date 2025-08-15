import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
      <Link to="/" className="flex items-center justify-center gap-2">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <Camera className="text-white h-5 w-5" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          UnamPix
        </span>
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          to="/galeria"
          className="text-sm font-medium hover:text-blue-600 transition-colors "
        >
          Galería
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Acerda de
        </Link>
        <Link
          to="/register"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Unete!
        </Link>
      </nav>
    </header>
  );
};
