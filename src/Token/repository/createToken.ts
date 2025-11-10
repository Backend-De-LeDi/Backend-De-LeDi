import { Itoken } from "../types/Token.type";



export interface createToken {
    createAdminToken(email: string): Promise<Itoken>
}