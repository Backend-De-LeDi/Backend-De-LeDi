import { Types } from "mongoose";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { UpdateProgresPort } from "../../domain/ports/updateProgressPort";
import { GetBooksByIds } from "../../../books/application/getBooksByIds";
import { UpdateUSer } from "../../../userService/application/service/UpdateUser.Service";
import { FindAndDeleteUser } from "../../../userService/application/service/FindAndDelete.service";

export class UpdateProgressService implements UpdateProgresPort {
    constructor(
        private readonly progresRepo: UpdateProgresPort,
        private readonly getBooksByIds: GetBooksByIds,
        private readonly getUser: FindAndDeleteUser,
        private readonly updateUser: UpdateUSer
    ) { }

    async updateProgres(
        id: string,
        data: Partial<BookUserProgresRepo>
    ): Promise<BookUserProgresRepo | null> {
        if (!data.idBook) {
            return await this.progresRepo.updateProgres(id, data);
        }

        const books = await this.getBooksByIds.run([new Types.ObjectId(data.idBook)]);
        const book = books[0];

        if (!book) {
            throw new Error("Libro no encontrado");
        }

        if (data.status === "finished") {
            data.finishDate = new Date();
            const user = await this.getUser.findByID(id);
            if (user) {
                await this.updateUser.updateUSer(id, { point: user.point + 100 });
                user.point
            }
        }


        if (book.format === "ebook" || book.format === "pdf" || book.format === "epub") {
            data.unit = "page";
            data.total = book.totalPages || 0;
        } else if (book.format === "audiobook" || book.format === "video") {
            data.unit = "second";
            data.total = book.duration || 0;
        }
        data.position = data.position ?? 0;


        if (data.total && data.position !== undefined) {
            data.percent = Math.min(100, (data.position / data.total) * 100);
        }

        return await this.progresRepo.updateProgres(id, data);
    }
}
