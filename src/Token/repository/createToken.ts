import { Itoken } from "../types/Token.type";



export interface createToken {
    createAdminToken(): Promise<Itoken>
}