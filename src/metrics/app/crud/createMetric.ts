import { MetricEventDetails } from "../../../shared/types/metricTypes/metricDetails";
import { UpdateOrCreateRepository } from "../../domain";

export class CreateMetric {
  constructor(private repository: UpdateOrCreateRepository) {}

  async exec(data: MetricEventDetails): Promise<void> {
    await this.repository.createOrUpdate(data);
  }
}
