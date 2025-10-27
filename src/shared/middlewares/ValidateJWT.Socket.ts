// sockets/middleware/socketAuth.ts
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.CLAVE_SECRETA || "clave_secreta";

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
    const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
        return next(new Error("No se encontró token para autenticación"));
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as any;
        socket.data.user = {
            id: decoded.id,
            rol: decoded.rol
        };
        next();
    } catch {
        next(new Error("Token de Socket.IO inválido"));
    }
};
