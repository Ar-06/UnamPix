import { usePublication } from "@/context/publics/usePublicacion";
import { Download, Heart, Share } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeaderForm } from "../forms/HeaderForm";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export const ImageDetail = () => {
  const { idPublicacion } = useParams<{ idPublicacion: string }>();
  const { loadingPublic, publicationOne, fetchPublicOne, initialUsers } =
    usePublication();

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
        <Card>
          <CardContent>
            <div
              key={publicationOne?.idPublicacion}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="relative">
                <img
                  className="h-100 w-100 object-cover rounded-md mb-2"
                  src={publicationOne.URL}
                  alt={publicationOne.titulo}
                />
                <Button className="relative h-10 w-10 rounded-full border-b bg-gradient-to-r from-blue-600 to-indigo-600 mr-2">
                  {initialUsers()}
                </Button>
                <span>{publicationOne.nombres}</span>
              </div>
              <div className="space-y-2 -ml-3">
                <div className="flex gap-4">
                  <h1 className="text-2xl font-bold">
                    {publicationOne?.titulo}
                  </h1>
                  <div className="flex items-center gap-4 justify-between translate-x-40">
                    <div className="flex justify-between gap-3">
                      <Heart className="cursor-pointer" onClick={handleLike} />
                      <span>{publicationOne.numReacciones}</span>
                    </div>
                    <Share className="cursor-pointer" />
                    <Download className="cursor-pointer" />
                  </div>
                </div>
                <p className="text-gray-500">{publicationOne?.descripcion}</p>
                {/* <p>{publicationOne.categoria}</p> */}
                <p className="text-blue-500 border-b pb-3">
                  {publicationOne.etiquetas}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
