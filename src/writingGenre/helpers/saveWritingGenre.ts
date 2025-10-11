import { WritingGenresSupabaseRepo } from "../infrastructure/writingGenresSupabaseRepo";
import { SaveWritingGenre } from "../app/saveWritingGenre";

const writingGenresSupabaseRepo = new WritingGenresSupabaseRepo();
export const saveWritingGenre = new SaveWritingGenre(writingGenresSupabaseRepo);

export default saveWritingGenre;