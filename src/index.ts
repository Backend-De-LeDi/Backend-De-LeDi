import express from "express";
import { createServer } from "http";
import path from "path";
import { Server, Socket } from "socket.io";
import ENV from "./shared/config/configEnv";
import connections from "./shared/config/db/database";

import { ComentTypes } from "./BookClub/coments/domain/entities/coments.types";
import { findForoById, findForosLogic } from "./BookClub/foros/interface/controllers/findForo";
import { createComentLogic } from "./BookClub/coments/interface/controllers/createComentControllers";
import chalk from "chalk";
import { app } from "./app";
import { getAllComents, getComentsByForo } from "./BookClub/coments/interface/controllers/findComentControllers";

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});


io.on("connection", async (socket: Socket) => {
    console.log("Conectado al servidor con id:", socket.id);

    // Enviar todos los comentarios al cliente cuando se conecta
    try {
        const coments = await getAllComents();
        socket.emit("coments", coments);
    } catch (error) {
        socket.emit("error", { msg: "Error al cargar comentarios" });
    }

    socket.on("get-all-foros", async () => {
        try {
            const foros = await findForosLogic()
            socket.emit("all-foros", foros);
        } catch (error) {
            socket.emit("error", { msg: "No se pudo obtener la lista de foros" });
        }
    });

    socket.on("get-foro-id", async (foroId: string) => {
        try {
            const foro = await findForoById(foroId)
            if (!foro) {
                socket.emit("foro-not-found", { msg: "Foro no encontrado" });
            } else {
                socket.emit("foro-data", foro);
            }
        } catch (error) {
            socket.emit("error", { msg: "Error al obtener foro por ID" });
        }
    })

    socket.on("new-public", async (data: ComentTypes) => {
        try {
            await createComentLogic(data);
            // Después de crear, obtenemos todos los comentarios y los emitimos a todos
            const coments = await getAllComents();
            io.emit("coments", coments);
        } catch (error) {
            console.error("Error en new-public:", error);
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });

    // Eliminamos el evento all-public porque ya no es necesario que el cliente lo solicite
    // Pero si lo quieres mantener por si acaso, lo dejamos, pero ahora con io.emit para que todos reciban la lista?
    // Si lo dejamos, cuando un cliente emita all-public, enviaremos la lista a todos los clientes.
    // Pero eso podría ser molesto si no se desea. Por eso, si lo dejamos, quizá sea mejor que solo responda al que solicita.
    // Depende de ti.

    // Si quieres que cuando un cliente solicite all-public, se actualice la lista en todos, entonces:
    socket.on("all-public", async () => {
        try {
            const result = await getAllComents();
            console.log(result)
            io.emit("coments", result);
        } catch (error) {
            console.error("Error en all-public:", error);
            socket.emit("error", { msg: "Error al obtener todos los comentarios" });
        }
    });

    socket.on("all-public-foro", async (foroId: string) => {
        try {
            const coments = await getComentsByForo(foroId);
            socket.emit("coments-in-the-foro", coments);
        } catch (error) {
            console.error("Error en all-public-foro:", error);
            socket.emit("error", { msg: "Error al obtener comentarios del foro" });
        }
    });

});
// ? configuración de puerto

server.listen(Number(ENV.PORT), async () => {
    console.log();
    console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
    console.log();
    await connections();
});




