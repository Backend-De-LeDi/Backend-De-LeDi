import { GetMetricBookRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoBooksMetric implements GetMetricBookRepository {
  async getBookMetricByDay(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "book", segmentType: "day" });
  }

  async getBookMetricByMonth(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "book", segmentType: "month" });
  }

  async getBookMetricByYear(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "book", segmentType: "year" });
  }
}
