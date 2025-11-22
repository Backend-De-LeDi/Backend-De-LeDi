

export class ComentTypes {
    constructor(
        public readonly idUser: any,
        public readonly content: string,
        public readonly idForo?: any,
        public readonly idComent?: any,
        public Admin?: boolean
    ) {

    }
}