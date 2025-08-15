import { createServer } from "http";
import { Server as SocketIO } from "socket.io";
import { app } from "./app.ts";
import { turso } from "./db/connection.ts";
import {
  type SendCommentPayload,
  type Comentario,
} from "./types/comentario.types.ts";
import { verifyAccessToken } from "./lib/jwt.ts";

export function startServer(port: string) {
  const server = createServer(app);
  const io = new SocketIO(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuario conectado", socket.id);

    socket.on("joinImageRoom", ({ idPublicacion }) => {
      if (idPublicacion) {
        socket.join(idPublicacion);
        console.log(`Usuario conectado al room ${idPublicacion}`);
      }
    });

    socket.on("sendComment", async (data: SendCommentPayload) => {
      const { token, idPublicacion, comentario } = data;

      if (!token || !idPublicacion || !comentario) {
        socket.emit("error", { message: "Datos incompletos" });
        return;
      }

      try {
        const payload = await verifyAccessToken(token);
        const idUsuario = payload.idUsuario;
        const nombres = payload.nombres;
        const fecha = new Date().toISOString();

        await turso.execute({
          sql: "INSERT INTO comentario (idUsuario, idPublicacion, Texto, Fecha) VALUES (?,?,?,?)",
          args: [idUsuario, idPublicacion, comentario, fecha],
        });

        const nuevoComentario: Comentario = {
          idPublicacion,
          idUsuario,
          nombres,
          texto: comentario,
          fecha,
        };

        io.to(idPublicacion).emit("receiveComment", nuevoComentario);
        console.log("Comentario emitido", nuevoComentario);

        await turso.execute({
          sql: "UPDATE usuario SET numComentarios = numComentarios + 1 WHERE idUsuario = ?",
          args: [idUsuario],
        });
      } catch (error: any) {
        console.error("Token inválido", error.message);
        socket.emit("error", { message: "Token invalido o expirado" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado", socket.id);
    });
  });

  server.listen(Number(port), () => {
    console.log(`Servidor + SocketIO en puerto ${port}`);
  });
}
