import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const parseFormData = (req: Request, res: Response, next: NextFunction): void => {
  req.body = req.body || {};

  const parseBoolean = (value: any): boolean => value === "true" || value === true;
  const parseArray = (value: any): string[] => (Array.isArray(value) ? value : [value]);
  const parseObjectIds = (value: any): Types.ObjectId[] => {
    const ids = Array.isArray(value) ? value : [value];
    return ids.filter((id) => Types.ObjectId.isValid(id)).map((id) => new Types.ObjectId(id));
  };
  const parseNumber = (value: any): number | undefined => {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };

  try {
    if ("available" in req.body) {
      req.body.available = parseBoolean(req.body.available);
    }
    if ("anthology" in req.body) {
      req.body.anthology = parseBoolean(req.body.anthology);
    }

    if ("subgenre" in req.body) {
      req.body.subgenre = parseArray(req.body.subgenre);
    }

    if ("author" in req.body) {
      req.body.author = parseObjectIds(req.body.author);
    }

    if ("theme" in req.body) {
      req.body.theme = parseArray(req.body.theme);
    }

    if ("totalPages" in req.body) {
      req.body.totalPages = parseNumber(req.body.totalPages);
    }
    if ("duration" in req.body) {
      req.body.duration = parseNumber(req.body.duration);
    }
  } catch (err) {}

  next();
};
