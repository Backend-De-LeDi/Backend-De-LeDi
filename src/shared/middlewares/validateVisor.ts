import { Request, Response, NextFunction } from "express";

export const validateVisor = (req: Request, res: Response, next: NextFunction): void => {
	const { isvisor } = req.headers;
	console.log(req.headers);

	if (isvisor !== "true") {
		res.status(403).json({ message: "acceso denegado ruta exclusiva para el visor" });
		return
	}
	next();
}