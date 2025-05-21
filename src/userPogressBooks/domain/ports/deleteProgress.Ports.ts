import { promises } from "fs";

export interface deleteProgress {
    deleteProgres(id: string): Promise<void>
}