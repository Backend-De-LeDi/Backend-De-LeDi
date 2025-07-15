import { photoProfile } from "../../../shared/types/photo.Types";

export class Author {
    public id: any;
    constructor(
        public readonly name: string,
        public readonly biography: string,
        public readonly avatar: photoProfile
    ) { }
}