import { Request, Response, Router } from "express";
import { GetBookMetricController } from "../controller/getSubgenreMetricController";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../shared/middlewares/validateRol";

export const subgenreMetricRouter = Router();
const controller = new GetBookMetricController();

subgenreMetricRouter.get(
  "/MetricSubgenre/day",
  validateJWT,
  validarRol("Admin"),
  async (req: Request, res: Response) => {
    await controller.getSubgenreMetricByDay(req, res);
  }
);

subgenreMetricRouter.get(
  "/MetricSubgenre/month",
  validateJWT,
  validarRol("Admin"),
  async (req: Request, res: Response) => {
    await controller.getSubgenreMetricByMonth(req, res);
  }
);

subgenreMetricRouter.get(
  "/MetricSubgenre/year",
  validateJWT,
  validarRol("Admin"),
  async (req: Request, res: Response) => {
    await controller.getSubgenreMetricByYear(req, res);
  }
);
