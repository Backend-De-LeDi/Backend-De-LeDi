export class Author {
    public id: any;
    constructor(
        public readonly name: string,
        public readonly lastName: string,
        public readonly birthDate: Date,
        public readonly biography: string,
        public readonly country: string,
        public readonly province: string
    ) { }
}