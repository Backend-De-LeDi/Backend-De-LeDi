import { Request, Response } from "express";
import { GetAuthorMetric } from "../../app/crud/getMetric";
import { MongoAuthorsMetric } from "../../infrastructure";

const getMetric = new GetAuthorMetric(new MongoAuthorsMetric());

export class GetAuthorMetricController {
  async getAuthorMetricByDay(_req: Request, res: Response): Promise<Response> {
    const result = await getMetric.day();
    if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

    return res.status(200).json(result);
  }

  async getAuthorMetricByMonth(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await getMetric.month();

      if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
    }
  }

  async getAuthorMetricByYear(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await getMetric.year();

      if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
    }
  }
}
