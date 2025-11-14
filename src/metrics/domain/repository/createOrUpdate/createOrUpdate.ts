import { MetricEventDetails } from "../../../../shared/types/metricTypes/metricDetails";

export interface UpdateOrCreateRepository {
  createOrUpdate(data: MetricEventDetails): Promise<void>;
}
