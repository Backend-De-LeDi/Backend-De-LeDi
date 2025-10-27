import { TokenModel } from "../models/AdminTokens";
import { createToken } from "../repository/createToken";
import { deleteToken } from "../repository/DeleteToken";
import { findToken } from "../repository/findToke";
import { Itoken } from "../types/Token.type";
import { programarEliminacionDeToken } from "../utils/DeleteToken";
import { generateCustomToken } from "../utils/GenerarToken";




export class CreateToken implements createToken {
    async createAdminToken(email: string): Promise<Itoken> {

        const tokenValue = generateCustomToken();
        const tokenDoc = new TokenModel({ token: tokenValue, userEmail: email });
        const result = await tokenDoc.save();
        programarEliminacionDeToken(result.token)
        return result;
    }
}

export class FindTokenMongo implements findToken {
    async findToken(token: string): Promise<Itoken | null> {
        const result = await TokenModel.findOne({ token: token })
        if (!result) {
            return null
        } else {
            return result;
        }
    }
}

export class DeleteToken implements deleteToken {
    async deleteTokens(token: string): Promise<void> {
        const result = await TokenModel.findOneAndDelete({
            token: token
        })
    }
}