import { Request, Response } from "express";
import { GetFormatMetric } from "../../app/crud/getMetric";
import { MongoFormatMetric } from "../../infrastructure/mongo/mongoFormatMetric";

const getFormat = new GetFormatMetric(new MongoFormatMetric());

export class GetFormatMetricController {
  async getFormatMetricByDay(_req: Request, res: Response): Promise<Response> {
    const result = await getFormat.day();
    if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

    return res.status(200).json(result);
  }

  async getFormatMetricByMonth(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await getFormat.month();

      if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
    }
  }

  async getFormatMetricByYear(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await getFormat.year();

      if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
    }
  }
}
