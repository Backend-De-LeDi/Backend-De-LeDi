import ENV from "../../../shared/config/configEnv";

export async function getAllAvatars(): Promise<string[]> {
    try {
        const response = await fetch(`https://localhost:${ENV.PORT}.com/getAvatars`);

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as string[];
        return data;
    } catch (error) {
        console.error('Error al obtener los avatares:', error);
        throw new Error('No se pudieron obtener los avatares');
    }
}
