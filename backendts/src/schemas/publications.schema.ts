import { z } from "zod";

export const createPublics = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  categoria: z.string(),
  etiquetas: z.string(),
});
