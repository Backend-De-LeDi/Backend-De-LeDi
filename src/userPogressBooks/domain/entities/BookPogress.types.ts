import { Types } from "mongoose";

export class BookUserProgresRepo {
    constructor(
        public readonly idUser: Types.ObjectId,
        public readonly idBook: Types.ObjectId,
        public readonly status: string,
        public readonly progress: number,
        public readonly startDate: Date,
    ) { }
}