import { Router } from "express";
import crudRouter from "./crud.routes";
import queriesRouter from "./queries.routes";
import metadataRouter from "./metadata.routes";
import authorsRouter from "./authors.routes";

const bookRouter = Router();

bookRouter.use(crudRouter);
bookRouter.use(queriesRouter);
bookRouter.use(metadataRouter);
bookRouter.use(authorsRouter);

export default bookRouter;