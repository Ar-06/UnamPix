import { usePublication } from "@/context/publics/usePublicacion";
import type { ListOfPublics } from "@/types/public";
import { Skeleton } from "../ui/skeleton";

interface Props {
  images: ListOfPublics;
}
const SKELETON_COUNT = 10;

export const ImagesGrid = ({ images }: Props) => {
  const { loading } = usePublication();

  if (loading) {
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
        <div className="flex justify-center items-center w-full h-60">
          <p className="text-center text-gray-500">
            Publicaciones no disponibles
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {images.map((image) => {
          return (
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
          );
        })}
      </div>
    </main>
  );
};
