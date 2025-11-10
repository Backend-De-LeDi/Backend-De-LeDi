import { Router } from "express";
import { ChatControllers } from "../controllers/chatBotControllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const control = new ChatControllers();
const chatRouter = Router();

chatRouter.post("/chat", validateJWT, control.chat);

export default chatRouter;
