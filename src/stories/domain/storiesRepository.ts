import { Stories } from "./stories";

export interface StoriesRepository {
  createStories: (stories: Stories) => Promise<void>;
}
