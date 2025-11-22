import ENV from "../../../shared/config/configEnv";


export async function getLevel(): Promise<{ id: any, url: string }> {
    try {
        const response = await fetch(`http://localhost:${ENV.PORT}/firtsLevel`);


        const data = await response.json();
        console.log("level dates", data)
        return {
            id: data.level,
            url: data.imgLevel
        }

    } catch (error) {
        console.error('Error al obtener los avatares:', error);
        throw new Error('No se pudieron obtener los avatares');
    }
}
