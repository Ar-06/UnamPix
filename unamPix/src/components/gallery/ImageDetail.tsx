import { usePublication } from "@/context/publics/usePublicacion";
import { CommentsPage } from "@/pages/Comments";
import { Download, Heart, Share } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeaderForm } from "../forms/HeaderForm";
import { Card, CardContent } from "../ui/card";

export const ImageDetail = () => {
  const { idPublicacion } = useParams<{ idPublicacion: string }>();
  const { loadingPublic, publicationOne, fetchPublicOne } = usePublication();

  useEffect(() => {
    if (idPublicacion) {
      fetchPublicOne(idPublicacion);
    }
  }, [idPublicacion, fetchPublicOne]);

  if (loadingPublic) {
    return <p>Cargando publicacion</p>;
  }

  if (!publicationOne) {
    return <p>Publicacion no encontrada</p>;
  }

  const handleLike = () => {
    console.log(`Like en la publicación ${publicationOne.idPublicacion}`);
  };

  return (
    <>
      <HeaderForm />
      <div className="flex items-center justify-center px-4 py-20">
        <Card className="overflow-hidden shadow-lg rounded-2xl bg-white w-full max-w-3xl">
          <CardContent>
            <div
              key={publicationOne?.idPublicacion}
              className="flex flex-col gap-6"
            >
              <div className="relative w-full">
                <img
                  className="w-full h-[400px] object-cover rounded-md"
                  src={publicationOne.URL}
                  alt={publicationOne.titulo}
                />

                <div className="absolute top-0 left-0 w-full flex justify-between items-center p-3">
                  <span className="border border-blue-400 rounded-full px-3 py-0.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white whitespace-nowrap shadow">
                    {publicationOne.categoria}
                  </span>

                  <div className="flex items-center gap-4 bg-white/70 rounded-full px-3 py-1 shadow">
                    <div className="flex items-center gap-2">
                      <button onClick={handleLike} aria-label="Me gusta">
                        <Heart className="cursor-pointer hover:text-red-500 transition-colors" />
                      </button>
                      <span>{publicationOne.numReacciones}</span>
                    </div>
                    <button aria-label="Compartir">
                      <Share className="cursor-pointer hover:text-blue-500 transition-colors" />
                    </button>
                    <button aria-label="Descargar">
                      <Download className="cursor-pointer hover:text-green-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{publicationOne?.titulo}</h1>
                <p className="text-gray-500">{publicationOne?.descripcion}</p>
                <p className="text-blue-500 border-b pb-3">
                  {publicationOne.etiquetas}
                </p>
                <CommentsPage idPublicacion={publicationOne.idPublicacion} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
