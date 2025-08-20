export interface Publics {
  idPublicacion: number;
  idUsuario: string;
  URL: string;
  titulo: string;
  fechaSubida: string;
  numReacciones: number;
  numComentarios: number;
  descripcion: string;
  categoria: string;
  etiquetas: string;
  nombres: string;
}

export interface CreatePublic {
  titulo: string;
  descripcion: string;
  categoria: string;
  etiquetas: string;
}

export interface CreatePublicResponse {
  message: string;
  publicacion: Publics;
}

export interface PublicResponseUser {
  message: string;
  publications: ListOfPublics;
}

export type idPublicacion = Pick<Publics, "idPublicacion">;
export type idUsuario = Pick<Publics, "idUsuario">;
export type categoria = Pick<Publics, "categoria">;
export type etiquetas = Pick<Publics, "etiquetas">;

export type ListOfPublics = Publics[];
