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
import { getAllComents, getComentByUserID, getComentsByForo } from "./BookClub/coments/interface/controllers/findComentControllers";
import { emit } from "process";

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});


io.on("connection", async (socket: Socket) => {
    console.log("Conectado al servidor con id:", socket.id);

    try {
        const coments = await getAllComents();
        socket.emit("coments", coments);
    } catch (error) {
        socket.emit("error", { msg: "Error al cargar comentarios" });
    }
    //? get foros 
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
    // ? creates- updates and deletes foros
    socket.on("new-public", async (data: ComentTypes) => {
        try {
            await createComentLogic(data);
            const coments = await getAllComents();
            io.emit("coments", coments);
        } catch (error) {
            console.error("Error en new-public:", error);
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });
    //? get Coments
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
    socket.on("all-publics-idUSer", async (idUser: string) => {
        try {
            const result = await getComentByUserID(idUser);
            console.log(result)
            console.log(`comentarios de ${idUser},result`)
            io.emit("user-publics", result);
        } catch (error) {
            console.error("Error al traer las publicaciones del usuario:", error);
            io.emit("error", {
                msg: "Error al obtener comentarios por userID", error
            })
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




