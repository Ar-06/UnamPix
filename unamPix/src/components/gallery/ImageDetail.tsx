import { usePublication } from "@/context/publics/usePublicacion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <div key={publicationOne?.idPublicacion}>
      <img src={publicationOne.URL} alt={publicationOne.titulo} />
      <h1>{publicationOne?.titulo}</h1>
      <p>{publicationOne?.descripcion}</p>
    </div>
  );
};
