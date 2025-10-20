import { Request, Response } from "express";
import { DeleteAuthors } from "../../app/service/DeleteAuthor.service";
import { DeleteAuthorMongoRepo, findAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";


// new instances of classes 
const deleteAuthorRepo = new DeleteAuthorMongoRepo();
const findAuthorRepo = new findAuthorMongoRepo()
const deleteAuthorService = new DeleteAuthors(deleteAuthorRepo, findAuthorRepo);

//delte author
export const deleteAuthorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteAuthorService.deleteAuthor(id);
        res.status(200).json({ message: "Author deleted successfully" });

    } catch (error) {
        console.error("Error deleting author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
