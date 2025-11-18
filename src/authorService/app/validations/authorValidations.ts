import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthorZodSchema, updataAuthorsZodSchema } from "./authZodSchema";
import { Author } from "../../domain/entidades/author.Types";

// Tipo explícito del resultado:
type AuthorValidationResult =
    | {
        success: true;
        data: Omit<Author, "_id" | "avatar">;
        status: 200;
    }
    | {
        success: false;
        message: string;
        errors: Array<{
            path: any; field: string; message: string
        }>;
        status: 400;
    };
type AuthorUpdateValidationResult =
    | {
        success: true;
        data: Partial<Omit<Author, "_id" | "avatar">>;
        status: 200;
    }
    | {
        success: false;
        message: string;
        errors: Array<{
            path: (string | number)[];
            field: string;
            message: string;
        }>;
        status: 400;
    };

export function authorValidation(data: Author): AuthorValidationResult {
    const parsed = AuthorZodSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            message: "Datos de usuario inválidos",
            errors: parsed.error.errors.map((error) => ({
                path: error.path,
                field: error.path.join("."),
                message: error.message,
            })),
            status: 400,
        };
    }

    return {
        success: true,
        data: parsed.data,
        status: 200,
    };
}

export function authorUpdateValidation(
    date: Partial<Author>
): AuthorUpdateValidationResult {
    const parsed = updataAuthorsZodSchema.safeParse(date);
    if (!parsed.success) {
        return {
            success: false,
            message: "Datos de usuario inválidos",
            errors: parsed.error.errors.map((error) => ({
                path: error.path,
                field: error.path.join("."),
                message: error.message,
            })),
            status: 400,
        };
    }

    return {
        success: true,
        data: parsed.data,
        status: 200,
    };

}
