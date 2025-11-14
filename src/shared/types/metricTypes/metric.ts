import { Document, Types, } from 'mongoose';

export type MetricType = 'book' | 'author' | 'subgenre' | 'format';
export type TimeMetricType = 'day' | 'month' | 'year';

export interface IMetricCounter {
	type: MetricType;
	count: number;
	segmentType: TimeMetricType;
	timeSegmentValue: string;
	idBook?: Types.ObjectId;
	idAuthor?: Types.ObjectId;
	subgenre?: string;
	format?: string;
	lastUpdated: Date;
}

export interface IMetric extends IMetricCounter, Document { }