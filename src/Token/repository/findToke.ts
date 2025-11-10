import { Itoken } from "../types/Token.type";


export interface findToken {
    findToken(token: string): Promise<Itoken | null>
}