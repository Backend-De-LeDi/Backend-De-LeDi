//dates of user
export class User {
    public _id: any;
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly lastName: string,
        public readonly userName: string,
        public readonly name: string,
        public readonly birthDate: Date,
        public readonly rol: string,
        public readonly nivel: string,
        public readonly avatar: any,
        public readonly preference: {
            category: string[]
        }

    ) { }
}

