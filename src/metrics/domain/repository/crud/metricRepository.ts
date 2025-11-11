import { IMetric } from "../../../../shared/types/metricTypes/metric"
import { MetricEventDetails } from "../../../../shared/types/metricTypes/metricDetails"

export interface MetricRepositoy {
	updateOrCreateMetrics(data: MetricEventDetails): Promise<void>
	getBookMetric(): Promise<IMetric[]>
}