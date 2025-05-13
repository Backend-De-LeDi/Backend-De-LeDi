//dates of user
// export interface User {
//     id: any;
//     userName: string,
//     name: string,
//     lastName: string,
//     email: string,
//     password: string,
//     birthDate: Date,
//     rol: string,
//     avatar?: string,
//     preference: {
//         category: string[],
//         language: string
//     }
// }
export class User {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly userName: string,


    ) { }
}

