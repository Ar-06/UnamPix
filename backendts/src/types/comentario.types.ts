export type SendCommentPayload = {
  token: string;
  idPublicacion: string;
  comentario: string;
};

export interface Comentario {
  idPublicacion: string;
  idUsuario: string;
  nombres: string;
  texto: string;
  fecha: string;
}

export interface ComentarioConUsuario {
  idComentario: string,
  idPublicacion: string;
  idUsuario: string;
  nombres: string;
  texto: string;
  fecha: string;
}