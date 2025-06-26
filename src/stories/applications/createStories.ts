import { Stories } from "../domain/stories";
import { StoriesRepository } from "../domain/storiesRepository";
import { Types } from "mongoose";

import { coverImage } from "../../types/bookTypes";
import { ContentStories } from "../../types/contentStories";

export class CreateStories {
  constructor(private repository: StoriesRepository) {}

  async run(
    title: string,
    descriptions: string,
    author: Types.ObjectId,
    subgenre: string[],
    language: string,
    available: boolean,
    content: ContentStories,
    coverImage: coverImage,
    summary: string
  ): Promise<void> {
    const stories = new Stories(
      title,
      descriptions,
      author,
      subgenre,
      language,
      available,
      content,
      coverImage,
      summary
    );
    await this.repository.createStories(stories);
  }
}
