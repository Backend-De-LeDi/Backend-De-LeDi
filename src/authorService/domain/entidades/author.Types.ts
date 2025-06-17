export class Author {
    public id: any;
    constructor(
        public readonly name: string,
        public readonly lastName: string,
        public readonly birthDate: Date,
        public readonly biography: string,
        public readonly parents: string,
        public readonly province: string
    ) { }
}