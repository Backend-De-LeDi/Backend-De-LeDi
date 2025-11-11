import { MetricEventDetails } from "../../../shared/types/metricTypes/metricDetails";
import { MetricRepositoy } from "../../domain/repository/crud/metricRepository";

export class CreateMetric {
	constructor(private repository: MetricRepositoy) { }

	async exec(data: MetricEventDetails): Promise<void> {
		await this.repository.updateOrCreateMetrics(data);
	}
}