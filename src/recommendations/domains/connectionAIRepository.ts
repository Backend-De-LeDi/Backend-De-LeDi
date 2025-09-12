export interface ConnectionAIRepository {
     getIdsForRecommendation(idsBooks: string[]): Promise<string[]>
}