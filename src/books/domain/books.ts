import type { Types } from "mongoose";
import { coverImage } from "../types/bookTypes";
export class Books {
  constructor(
    public title: string,
    public descriptions: string,
    public author: string,
    public userId: Types.ObjectId,
    public category: string[],
    public language: string,
    public available: boolean,
    public content: Types.ObjectId,
    public pathInternal: string,
    public coverImage: coverImage
  ) { }
}
