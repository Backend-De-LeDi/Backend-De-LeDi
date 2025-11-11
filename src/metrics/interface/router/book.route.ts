import { Request, Response, Router } from "express";
import { GetBookMetricController } from "../controller/getBookMetricController";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../shared/middlewares/validateRol";

export const bookMetricRouter = Router();
const controller = new GetBookMetricController();

bookMetricRouter.get("/MetricBook/day", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getBookMetricByDay(req, res);
});

bookMetricRouter.get("/MetricBook/month", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getBookMetricByMonth(req, res);
});

bookMetricRouter.get("/MetricBook/year", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
  await controller.getBookMetricByYear(req, res);
});
