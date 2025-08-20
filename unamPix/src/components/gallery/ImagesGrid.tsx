import { usePublication } from "@/context/publics/usePublicacion";
import type { ListOfPublics } from "@/types/public";
import { Camera, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface Props {
  images: ListOfPublics;
  isUserProfile?: boolean;
}
const SKELETON_COUNT = 10;

export const ImagesGrid = ({ images, isUserProfile }: Props) => {
  const { loadingUserPublications } = usePublication();

  if (loadingUserPublications) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <Skeleton key={i} className="h-60 rounded-lg" />
          ))}
        </div>
      </main>
    );
  }

  if (images.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col justify-center items-center w-full py-16 px-4">
          {isUserProfile ? (
            <>
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-blue-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Crea tu primera publicación
              </h3>

              <p className="text-gray-500 text-center max-w-md leading-relaxed mb-6">
                ¿Descubriste algo nuevo? Crea publicaciones con imágenes a fin
                de compartir tu inspiración.
              </p>

              <Link to="/createPublication">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md cursor-pointer">
                  Crear publicación
                </button>
              </Link>
            </>
          ) : (
            <div className="text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Publicaciones no disponibles</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {images.map((image) => (
          <div
            key={image.idPublicacion}
            className="group rounded-lg overflow-hidden shadow-sm 
               transition-all duration-300 hover:shadow-xl hover:scale-105
               aspect-[3/4] bg-gray-200 cursor-pointer"
          >
            <img
              src={image.URL?.trim()}
              alt={image.titulo || "Sin título"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </main>
  );
};
