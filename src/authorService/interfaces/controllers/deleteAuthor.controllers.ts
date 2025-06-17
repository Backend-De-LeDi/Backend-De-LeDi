import { Request, Response } from "express";
import { DeleteAuthors } from "../../app/service/DeleteAuthor.service";
import { DeleteAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";


// new instances of classes 
const deleteAuthorRepo = new DeleteAuthorMongoRepo();
const deleteAuthorService = new DeleteAuthors(deleteAuthorRepo);

//delte author
export const deleteAuthorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteAuthorService.deleteAuthor(id);
        return res.status(200).json({ message: "Author deleted successfully" });

    } catch (error) {
        console.error("Error deleting author:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
