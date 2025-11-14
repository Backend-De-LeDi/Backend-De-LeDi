import { GetMetricSubgenreRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoSubgenreMetric implements GetMetricSubgenreRepository {
  async getSubgenreMetricByDay(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "subgenre", segmentType: "day" });
  }

  async getSubgenreMetricByMonth(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "subgenre", segmentType: "month" });
  }

  async getSubgenreMetricByYear(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "subgenre", segmentType: "year" });
  }
}
