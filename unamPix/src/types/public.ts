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

export type idPublicacion = Pick<Publics, "idPublicacion">;
export type idUsuario = Pick<Publics, "idUsuario">;
export type URL = Pick<Publics, "URL">;
export type titulo = Pick<Publics, "titulo">;
export type fechaSubida = Pick<Publics, "fechaSubida">;
export type numReacciones = Pick<Publics, "numReacciones">;
export type numComentarios = Pick<Publics, "numComentarios">;
export type descripcion = Pick<Publics, "descripcion">;
export type categoria = Pick<Publics, "categoria">;
export type etiquetas = Pick<Publics, "etiquetas">;
export type nombres = Pick<Publics, "nombres">;

export type ListOfPublics = Publics[];
