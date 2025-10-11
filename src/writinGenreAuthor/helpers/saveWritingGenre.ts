import { WritingGenresSupabaseRepo } from "../infrastructure/writingGenresAuthorSupabaseRepo";
import { SaveWritingGenreAuthor } from "../app/saveWritingGenre";

const writingGenresSupabaseRepo = new WritingGenresSupabaseRepo();
export const saveWritingGenreAuthor = new SaveWritingGenreAuthor(writingGenresSupabaseRepo);
