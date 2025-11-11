import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricRepositoy } from "../../domain";

export class GetBookMetric {
	constructor(private repository: MetricRepositoy) { }

	async exec(): Promise<IMetric[]> {
		return await this.repository.getBookMetric()
	}
}