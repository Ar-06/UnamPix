import type { Request, Response } from "express";
import { turso } from "../db/connection.ts";
import { uploadImage, deleteImage } from "../lib/cloudinary.ts";
import fs from "fs-extra";
import type {
  Publicacion,
  PublicacionBody,
} from "../types/publication.types.ts";
import type { UploadedFile } from "express-fileupload";
import { queryOne } from "../types/query.types.ts";

export const createPublic = async (
  req: Request<{}, {}, PublicacionBody>,
  res: Response
) => {
  try {
    const { titulo, descripcion, categoria, etiquetas } = req.body;
    const idUsuario = req.user?.idUsuario;
    const fechaSubida = new Date().toISOString();

    let foto_url = null;

    if (!req.files?.image) {
      res
        .status(400)
        .json({ message: "Se requiere una imagen para la publicacion" });
      return;
    }

    if (req.files?.image) {
      const imagen = req.files.image as UploadedFile;
      const resultImage = await uploadImage(imagen.tempFilePath);
      foto_url = resultImage.secure_url.trim();

      let etiquetasArray: string[] = [];

      if (typeof etiquetas === "string") {
        etiquetasArray = etiquetas
          .split(" ")
          .map((tag) => tag.trim())
          .filter((tag) => tag.startsWith("#") && tag.length > 1);
      }

      if (etiquetasArray.length === 0) {
        res.status(400).json({
          message: "Debes agregar al menos una etiqueta válida (ej: #unam)",
        });
        return;
      }

      if (etiquetasArray.length > 3) {
        res
          .status(400)
          .json({ message: "Solo puedes agregar hasta 3 etiquetas" });
        return;
      }

      const result = await turso.execute({
        sql: `INSERT INTO publicacion (idUsuario, URL, Titulo, FechaSubida, NumReacciones, NumComentarios, Descripcion, Categoria)
        VALUES (?,?,?,?,?,?,?,?) RETURNING idPublicacion`,
        args: [
          idUsuario,
          foto_url,
          titulo,
          fechaSubida,
          0,
          0,
          descripcion,
          categoria,
        ],
      });

      const idPublicacion = result.rows[0]!.idPublicacion;

      if (!idPublicacion) {
        res
          .status(500)
          .json({ message: "Error: No se generó el ID de la publicación" });
        return;
      }

      for (const etiqueta of etiquetasArray) {
        await turso.execute(
          "INSERT INTO etiquetas (idPublicacion, nombre) VALUES (?, ?)",
          [idPublicacion, etiqueta]
        );
      }

      await turso.execute({
        sql: "UPDATE usuario SET NumPublicaciones = NumPublicaciones + 1 WHERE idUsuario = ?",
        args: [idUsuario],
      });

      const nuevaPublicacion = {
        idPublicacion: idPublicacion,
        idUsuario: idUsuario,
        URL: foto_url,
        titulo: titulo,
        fechaSubida: fechaSubida,
        numReacciones: 0,
        numComentarios: 0,
        descripcion: descripcion,
        categoria: categoria,
        etiquetas: etiquetasArray.join(" "),
        nombres: req.user?.nombres,
      };

      res.status(201).json({
        message: "Publicación creada con éxito",
        publicacion: nuevaPublicacion,
      });
      return;
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al crear la publicacion: " + error.message });
  }
};

export const getPublications = async (req: Request, res: Response) => {
  try {
    const publicaciones = await turso.execute({
      sql: `SELECT p.*, GROUP_CONCAT(e.nombre, ' ') AS etiquetas, u.Nombres
        FROM publicacion p
        LEFT JOIN etiquetas e ON p.idPublicacion = e.idPublicacion
        JOIN usuario u ON p.idUsuario = u.idUsuario
        GROUP BY p.idPublicacion`,
    });

    if (publicaciones.rows.length === 0) {
      res.status(404).json({ message: "No hay publicaciones" });
      return;
    }

    res.status(200).json(publicaciones.rows);
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al obtener las publicaciones: " + error.message });
  }
};

export const updatePublics = async (req: Request, res: Response) => {
  const { idPublicacion } = req.params;
  const idUsuario = req.user?.idUsuario;

  const { titulo, descripcion, categoria, etiquetas } = req.body;

  try {
    const publicacion = await queryOne<Publicacion>(
      "SELECT * FROM publicacion WHERE idUsuario = ?",
      [idPublicacion]
    );

    if (!publicacion) {
      res.status(404).json({ message: "Publicación no encontrada" });
      return;
    }

    if (publicacion.idUsuario !== idUsuario) {
      res
        .status(401)
        .json({ message: "No autorizado para editar esta publicacion" });
      return;
    }

    if (req.files?.image) {
      const segments = publicacion.URL.split("/");
      const nombreArchivo = segments[segments.length - 1];
      const publicId = `galeria/${nombreArchivo?.split(".")[0]}`;
      await deleteImage(publicId);

      const result = req.files?.image as UploadedFile;
      const resultUpload = await uploadImage(result.tempFilePath);
      publicacion.URL = resultUpload.secure_url;
      await fs.unlink(result.tempFilePath);
    }

    const etiquetasArray = JSON.parse(etiquetas);
    if (etiquetasArray.length > 3 || etiquetasArray.length === 0) {
      res
        .status(400)
        .json({ message: "Solo puedes agregar hasta 3 etiquetas" });
      return;
    }

    await queryOne<PublicacionBody>(
      "Update publicacion SET url = ?, Titulo = ?, Descripcion = ?, Categoria = ? WHERE idPublicacion = ?",
      [
        publicacion.URL,
        titulo || publicacion.titulo,
        descripcion || publicacion.descripcion,
        categoria || publicacion.categoria,
        idPublicacion,
      ]
    );

    await turso.execute({
      sql: "DELETE FROM etiquetas WHERE idPublicacion = ?",
      args: [idPublicacion as string],
    });

    for (const etiqueta of etiquetasArray) {
      await turso.execute({
        sql: "INSERT INTO etiquetas (idPublicacion, nombre) VALUES (?,?)",
        args: [idPublicacion as string, etiqueta],
      });
    }

    res.status(200).json({ message: "Publicacion actualizada" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al actualizar la publicacion: " + error.message });
  }
};

export const deletePublic = async (req: Request, res: Response) => {
  const { idPublicacion } = req.params;
  const idUsuario = req.user?.idUsuario;

  try {
    const publicacion = await queryOne<Publicacion>(
      "SELECT * FROM publicacion WHERE idPublicacion = ?",
      [idPublicacion]
    );

    if (!publicacion) {
      res.status(404).json({ message: "Publicacion no encontrada" });
      return;
    }

    if (publicacion.idUsuario !== idUsuario) {
      res
        .status(401)
        .json({ message: "No autorizado para eliminar esta publicacion" });
      return;
    }

    if (publicacion.URL) {
      const segments = publicacion.URL.split("/");
      const nombreArchivo = segments[segments.length - 1];
      const publicId = `galeria/${nombreArchivo?.split(".")[0]}`;
      await deleteImage(publicId);
    }

    await queryOne<Publicacion>(
      "DELETE FROM publicacion WHERE idPublicacion = ?",
      [idPublicacion]
    );

    await turso.execute({
      sql: "UPDATE usuario SET NumPublicaciones = NumPublicaciones - 1 WHERE idUsuario = ?",
      args: [idUsuario],
    });

    res.status(200).json({ message: "Publicacion eliminada correctamente" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al eliminar la publicacion: " + error.message });
  }
};

export const getPublicsByUser = async (req: Request, res: Response) => {
  const idUsuario = req.user?.idUsuario;

  try {
    const publicacionesByUser = await turso.execute(
      "SELECT * FROM publicacion WHERE idUsuario = ?",
      [idUsuario]
    );

    res.status(200).json({
      publications: publicacionesByUser.rows,
      message:
        publicacionesByUser.rows.length === 0
          ? "El usuario no tiene publicaciones disponibles"
          : null,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error al obtener las publicaciones del usuario: " + error.message,
    });
  }
};
