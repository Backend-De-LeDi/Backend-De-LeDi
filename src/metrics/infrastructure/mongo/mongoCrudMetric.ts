import { MetricRepositoy } from "../../domain";
import { MetricType, TimeMetricType, IMetricCounter, IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricEventDetails } from "../../../shared/types/metricTypes/metricDetails";
import { MetrcModel } from "../model/metricModel";

export class MongoCrudMetric implements MetricRepositoy {

	async updateOrCreateMetrics(eventDetails: MetricEventDetails): Promise<void> {
		const today = new Date();
		const dateValues = {
			year: today.toISOString().substring(0, 4),
			month: today.toISOString().substring(0, 7),
			day: today.toISOString().substring(0, 10),
		};

		const metricBases: any[] = [
			{ type: 'book' as MetricType, idBook: eventDetails.idBook },
			{ type: 'author' as MetricType, idAuthor: eventDetails.idAuthor },
			{ type: 'subgenre' as MetricType, subgenre: eventDetails.subgenre },
			{ type: 'format' as MetricType, format: eventDetails.format }
		];

		let updateOperations: Promise<IMetric | null>[] = [];

		for (const base of metricBases) {
			if (!base.idBook && !base.idAuthor && !base.subgenre && !base.format) continue;

			for (const segment of ['day', 'month', 'year'] as TimeMetricType[]) {

				const filter: Partial<IMetricCounter> = {
					type: base.type,
					segmentType: segment,
					timeSegmentValue: dateValues[segment]
				};

				if (base.idBook) (filter as any).idBook = base.idBook;
				if (base.idAuthor) (filter as any).idAuthor = base.idAuthor;
				if (base.subgenre) filter.subgenre = base.subgenre;
				if (base.format) filter.format = base.format;

				updateOperations.push(
					MetrcModel.findOneAndUpdate(
						filter,
						{ $inc: { count: 1 }, $set: { lastUpdated: today } },
						{ upsert: true, new: true }
					).exec()
				);
			}
		}

		// Espera a que todas las 12 operaciones atómicas terminen
		await Promise.all(updateOperations);
	}

	async getBookMetric(): Promise<IMetric[]> {
		return await MetrcModel.find({ type: "book" })
	}
}