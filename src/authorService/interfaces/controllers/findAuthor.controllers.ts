import { Request, Response } from "express";
import { FindAuthors } from "../../app/service/FindAuthor.service";
import { FindAuthor as findAuthorRepo } from "../../domain/ports/findAuthorRepository";
import { findAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";
import { CreateMetric } from "../../../metrics/app";
import { MongoIndexMetric } from "../../../metrics/infrastructure";
import { MetricEventDetails } from "../../../shared/types/metricTypes/metricDetails";

const findAuthorRepo = new findAuthorMongoRepo();
const findAuthorService = new FindAuthors(findAuthorRepo);

const metricRepo = new MongoIndexMetric();
const createMetric = new CreateMetric(metricRepo);

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await findAuthorService.findAuthor(id);

    if (!author) {
      res.status(404).json({ message: "Autor no encontrado" });
      return;
    }

    const data: MetricEventDetails = {
      idBook: undefined,
      idAuthor: author._id,
      subgenre: undefined,
      format: undefined,
    };
    await createMetric.exec(data);

    res.status(200).json(author);
    return;
  } catch (error) {
    console.error("Error al buscar autor:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const getAuthorByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const author = await findAuthorService.findAuthorbyName(name);

    if (!author) {
      res.status(404).json({ message: "Autor no encontrado" });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error("Error al buscar autor:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllAuthores = async (req: Request, res: Response) => {
  try {
    const result = await findAuthorService.findAuthores();

    res.status(200).json({ msg: "the authors", result });
  } catch (error) {
    console.error("Error al buscar autor:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
