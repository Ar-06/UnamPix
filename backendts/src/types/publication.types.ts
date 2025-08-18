export interface PublicacionBody {
  idUsuario: string;
  foto_url: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  etiquetas: string;
}

export interface Publicacion {
  idPublicacion: string;
  idUsuario: string;
  URL: string;
  titulo: string;
  fechaSubida: string;
  numReacciones: number;
  numComentarios: number;
  descripcion: string;
  categoria: string;
  etiquetas: string;
}
