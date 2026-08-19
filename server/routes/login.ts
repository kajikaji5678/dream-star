import { Router } from "express";
import { getLoginInfo } from "../controller/loginController.js";

const loginRouter = Router();

loginRouter.get("/get", getLoginInfo);

export default loginRouter;