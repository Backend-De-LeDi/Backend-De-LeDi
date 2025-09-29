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


io.on("connection", (socket: Socket) => {
    console.log("✅ Conectado al servidor con id:", socket.id);
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
            const result = await createComentLogic(data);
            console.log("📤 Enviando evento new-public:", { data });
            io.emit("coment-created", result);
        } catch (error) {
            console.error("Error en new-public:", error);
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });
    socket.on("new-public", async (data: ComentTypes) => {
        try {
            const result = await createComentLogic(data);

            io.emit("coment-created", result);
        } catch (error) {
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });
    socket.on("all-public", async () => {
        const result = await getAllComents()
        io.emit("coments", result)
    })
    socket.on("all-public-foro", async (foroId: string) => {
        const coments = await getComentsByForo(foroId);
        socket.emit("coments in the foro", coments);
    });

})
// ? configuración de puerto

server.listen(Number(ENV.PORT), async () => {
    console.log();
    console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
    console.log();
    await connections();
});




