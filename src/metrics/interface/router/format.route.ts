import { Request, Response, Router } from "express";
import { GetFormatMetricController } from "../controller/getFormatMetricController";
import { validarRol } from "../../../shared/middlewares/validateRol";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

export const formatMetricRouter = Router();
const controller = new GetFormatMetricController();

formatMetricRouter.get("/MetricFormat/day", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getFormatMetricByDay(req, res);
});

formatMetricRouter.get("/MetricFormat/month", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getFormatMetricByMonth(req, res);
});

formatMetricRouter.get("/MetricFormat/year", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getFormatMetricByYear(req, res);
});
