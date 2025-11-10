import { DeleteToken } from "../MongoRepository/TokenMongo";

export function programarEliminacionDeToken(token: string, delayMs: number = 3600000) {
    const deleteService = new DeleteToken();

    setTimeout(async () => {
        try {
            await deleteService.deleteTokens(token);
            console.log(`Token eliminado tras ${delayMs / 1000} segundos: ${token}`);
        } catch (error) {
            console.error(" Error al eliminar el token:", error);
        }
    }, delayMs);
}