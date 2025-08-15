import { z } from "zod";

export const registerSchema = z.object({
  idUsuario: z.string().max(10),
  nombres: z.string(),
  apellidos: z.string(),
  contraseña: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 carácteres",
    })
    .max(20),
});

export const loginSchema = z.object({
  idUsuario: z.string(),
  contraseña: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 carácteres",
    })
    .max(20),
});
