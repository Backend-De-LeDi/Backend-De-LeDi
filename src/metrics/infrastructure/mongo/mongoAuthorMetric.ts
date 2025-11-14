import { GetMetricAuthorRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoAuthorsMetric implements GetMetricAuthorRepository {
  async getAuthorMetricByDay(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "author", segmentType: "day" });
  }

  async getAuthorMetricByMonth(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "author", segmentType: "month" });
  }

  async getAuthorMetricByYear(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "author", segmentType: "year" });
  }
}
