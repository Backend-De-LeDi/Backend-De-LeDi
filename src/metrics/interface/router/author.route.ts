import { Request, Response, Router } from "express";
import { GetAuthorMetricController } from "../controller/getAuthorMetricController";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../shared/middlewares/validateRol";

export const authorMetricRouter = Router();
const controller = new GetAuthorMetricController();

authorMetricRouter.get("/MetricBook/day", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getAuthorMetricByDay(req, res);
});

authorMetricRouter.get("/MetricAuthor/month", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getAuthorMetricByMonth(req, res);
});

authorMetricRouter.get("/MetricAuthor/year", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getAuthorMetricByYear(req, res);
});
