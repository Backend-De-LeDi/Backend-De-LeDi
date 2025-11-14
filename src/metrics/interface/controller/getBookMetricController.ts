import { MongoBooksMetric } from "../../infrastructure";
import { GetBookMetric, GetSubgenreMetric } from "../../app/crud/getMetric";
import { Request, Response } from "express";

const getMetric = new GetBookMetric(new MongoBooksMetric());

export class GetBookMetricController {
  async getBookMetricByDay(_req: Request, res: Response): Promise<Response> {
    const result = await getMetric.day();
    if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

    return res.status(200).json(result);
  }

  async getBookMetricByMonth(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await getMetric.month();

      if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas " });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
    }
  }

  async getBookMetricByYear(_req: Request, res: Response): Promise<Response> {
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
