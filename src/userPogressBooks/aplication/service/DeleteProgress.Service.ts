import { deleteProgress } from '../../domain/ports/deleteProgress.Ports'

export class DeleteProgresService implements deleteProgress {
    constructor(
        private readonly bookRepo: deleteProgress
    ) {

    }
    async deleteProgres(id: string): Promise<void> {
        await this.bookRepo.deleteProgres(id)
    }
}