// import { Request, Response } from "express";
// import { UpdateProgressService } from "../../aplication/service/UpdateProgress.Service";
// import { UpdateProgressMongo, DeleteRepo } from "../../infrastructure/bookProgressRepoMongo";
// import { GetBooksByIds } from "../../../books/application/getBooksByIds";
// import { MongoBookRepository } from "../../../books/infrastructure/mongoBookRepository";

// //intancias
// const updateRepo = new UpdateProgressMongo();
// const booksRepo = new MongoBookRepository();
// const getBooksByIds = new GetBooksByIds(booksRepo);
// const bookService = new UpdateProgressService(updateRepo, getBooksByIds);

// //controllador para actualizar progreso
// export const updateProgresBook = async (req: Request, res: Response) => {
//     try {
//         const id = req.user?.id;
//         const objectId = typeof id === "string" ? new ObjectId(id) : id;
//         const { id,..date } = req.body;

//         const result = await bookService.updateProgres(id, date);

//         if (!result) {
//             res.status(200).json({ msg: 'Progress was unmarked and deleted successfully.' });
//         } else {
//             res.status(200).json({ msg: 'Progress updated successfully.', result });
//         }


//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };
