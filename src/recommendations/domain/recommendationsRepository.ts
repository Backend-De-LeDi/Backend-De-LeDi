import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

export interface RecommendationsRepository {
  recommendation: (id: string[]) => Promise<SearchedBook[]>;
}
