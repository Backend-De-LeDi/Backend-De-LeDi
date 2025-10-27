export interface RecommendationRepository {
     getIdsForRecommendation(idsBooks: string[]): Promise<string[]>;
}