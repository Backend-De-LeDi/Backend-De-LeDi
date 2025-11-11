import { Types } from "mongoose";
export interface MetricEventDetails {
	idBook?: Types.ObjectId;
	idAuthor?: Types.ObjectId;
	subgenre?: string;
	format?: string;
}