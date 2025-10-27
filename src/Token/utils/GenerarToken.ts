import crypto from "crypto";

export function generateCustomToken(length: number = 6): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&#?";
    const randomBytes = crypto.randomBytes(length);
    let token = "";

    for (let i = 0; i < length; i++) {
        const index = randomBytes[i] % chars.length;
        token += chars[index];
    }

    return token;
}