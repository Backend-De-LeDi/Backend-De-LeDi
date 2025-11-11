import { Types } from "mongoose";

type MetricType = "book" | "author" | "subgenre" | "format";
type TimeSegment = "day" | "month" | "year";

export class Metric {
	readonly _id?: Types.ObjectId;
	readonly type: MetricType;
	readonly count: number;
	readonly segmentType: TimeSegment;
	readonly timeSegmentValue: string;
	readonly idBook?: Types.ObjectId;
	readonly idAuthor?: Types.ObjectId;
	readonly subgenre?: string;
	readonly format?: string;

	constructor(
		type: MetricType,
		count: number,
		segmentType: TimeSegment,
		timeSegmentValue: string,
		_id?: Types.ObjectId,
		idBook?: Types.ObjectId,
		idAuthor?: Types.ObjectId,
		subgenre?: string,
		format?: string
	) {
		this._id = _id;
		this.type = type;
		this.count = count;
		this.segmentType = segmentType;
		this.timeSegmentValue = timeSegmentValue;
		this.idBook = idBook;
		this.idAuthor = idAuthor;
		this.subgenre = subgenre;
		this.format = format;
	};
}