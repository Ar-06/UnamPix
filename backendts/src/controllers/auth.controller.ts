import bcrypt from "bcryptjs";
import { queryOne } from "../types/query.types.ts";
import { createAccessToken, verifyAccessToken } from "../lib/jwt.ts";
import { turso } from "../db/connection.ts";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import type {
  LoginUserBody,
  RegisterUserBody,
  Usuario,
} from "../types/user.types.ts";
dotenv.config();

export const register = async (
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) => {
  const { idUsuario, nombres, apellidos, contraseña } = req.body;

  try {
    const result = await queryOne<Usuario>(
      `SELECT * FROM usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (result) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    const hashPassword = await bcrypt.hash(contraseña, 10);
    const fechaRegistro = new Date().toISOString();

    await turso.execute({
      sql: `INSERT INTO usuario (idUsuario, Nombres, Apellidos, Contraseña, NumPublicaciones, FechaRegistro, NumReacciones, NumComentarios) VALUES (?,?,?,?,0,?,0,0)`,
      args: [idUsuario, nombres, apellidos, hashPassword, fechaRegistro],
    });

    const token = await createAccessToken({
      idUsuario: idUsuario,
      nombres: nombres,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({ message: "Usuario registrado con éxito: ", token });
  } catch (error: any) {
    res.status(500).json({ error: "Error al registrar: " + error.message });
  }
};

export const login = async (
  req: Request<{}, {}, LoginUserBody>,
  res: Response
) => {
  const { idUsuario, contraseña } = req.body;

  try {
    const user = await queryOne<Usuario>(
      `SELECT * FROM usuario Where idUsuario = ?`,
      [idUsuario]
    );

    if (!user) {
      res.status(400).json({ message: "Usuario no existe, registrese" });
      return;
    }

    const matchPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!matchPassword) {
      res.status(400).json({ message: "Contraseña inválida" });
      return;
    }

    const token = await createAccessToken({
      idUsuario: user.idUsuario,
      nombres: user.nombres,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.json({ token });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error al iniciar sesión: " + error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No autorizado, token no encontrado" });
      return;
    }

    const payload = await verifyAccessToken(token);

    const result = await turso.execute({
      sql: "SELECT idUsuario, Nombres, Apellidos FROM usuario WHERE idUsuario = ?",
      args: [payload.idUsuario],
    });

    const userFound = result.rows[0];

    if (!userFound) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(userFound);
  } catch (error: any) {
    console.error("Error en verifyToken: " + error);
    res
      .status(500)
      .json({ error: "Error al verificar token: " + error.message });
  }
};
