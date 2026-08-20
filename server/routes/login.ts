import { Router } from "express";
import { getLoginInfo, updateLogin } from "../controller/loginController.js";

const loginRouter = Router();

loginRouter.get("/get/:userId", getLoginInfo);
loginRouter.put("/put/:userId", updateLogin);

export default loginRouter;