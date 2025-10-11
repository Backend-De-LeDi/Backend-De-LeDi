import { Request, Response } from "express";
import { DeleteAuthors } from "../../app/service/DeleteAuthor.service";
import { DeleteAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";
import { AuthorSupabaseRepo } from "../../infrastructure/author.supabaseRepo";


// new instances of classes 
const deleteAuthorRepo = new DeleteAuthorMongoRepo();
const authorSupabaseRepo = new AuthorSupabaseRepo();
const deleteAuthorService = new DeleteAuthors(deleteAuthorRepo);
const deleteAuthorSupabaseService = new DeleteAuthors(authorSupabaseRepo);

//delte author
export const deleteAuthorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteAuthorService.deleteAuthor(id);
        if (result === null) {
            res.status(404).json({ message: "Author not found" });
            return
        }
        await deleteAuthorSupabaseService.deleteAuthor(id);
        res.status(200).json({ message: "Author deleted successfully" });

    } catch (error) {
        console.error("Error deleting author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
