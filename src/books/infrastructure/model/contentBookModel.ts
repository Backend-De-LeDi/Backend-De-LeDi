import { model, Schema } from "mongoose";
import { IContainer } from "../../../types/contentBook";

const contentBook = new Schema<IContainer>({
  path: { type: String, required: true },
});

const ContentBook = model<IContainer>("ContentBooks", contentBook);

export default ContentBook;
