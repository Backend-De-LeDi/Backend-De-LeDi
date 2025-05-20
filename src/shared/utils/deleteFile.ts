import { promises as fs } from "fs";

export async function fileDelete(path: string): Promise<boolean> {
  try {
    await fs.unlink(path);
    console.log(`✅ Archivo eliminado: ${path}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al eliminar archivo (${path}):`, error);
    return false;
  }
}
