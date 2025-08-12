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

const server = createServer(app)
const io = new Server(server);



io.on("connction", (socket: Socket) => {
    console.log('conect client', socket.id)
    socket.on("get-all-foros", async () => {
        try {
            const foros = await findForosLogic()
            socket.emit("all-foros", foros);
        } catch (error) {
            socket.emit("error", { msg: "No se pudo obtener la lista de foros" });
        }
    });

    socket.on("get-all-foros   ", async (foroId: string) => {
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

            io.emit("coment-created", result);
        } catch (error) {
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });

})
// ? configuración de puerto

server.listen(Number(ENV.PORT), async () => {
    console.log();
    console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
    console.log();
    await connections();
});




