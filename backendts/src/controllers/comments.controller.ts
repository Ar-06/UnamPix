import type { Request, Response } from "express";
import { queryOne } from "../types/query.types.ts";
import type { ComentarioConUsuario } from "../types/comentario.types.ts";

export const getCommentsByPublic = async (req: Request, res: Response) => {
  const { idPublicacion } = req.params;

  try {
    const comentarios = await queryOne<ComentarioConUsuario>(
      "SELECT c.*, u.nombres FROM comentario c JOIN usuario u ON u.idUsuario = c.idUsuario WHERE idPublicacion = ? ORDER BY c.fecha ASC",
      [idPublicacion]
    );

    if (!comentarios) {
      res
        .status(404)
        .json({ message: "No hay comentarios para esta publicación" });
      return;
    }

    res.status(200).json(comentarios);
    return;
  } catch (error: any) {
    res.status(500).json({
      error:
        "Error al obtener los comentarios de la publicación: " + error.message,
    });
  }
};
