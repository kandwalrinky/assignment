import express, { Request, Response } from "express";
import { userValidation } from "../middleware/user/user.validations";
import { userController } from "../controller/UserController";
import { auth } from "../middleware/Auth";


const apiRoutes = express.Router();

apiRoutes.post('/register', userValidation.create(), (req: express.Request, res: express.Response) => {
    userController.create(req, res)
});


apiRoutes.post('/login', userValidation.login(), (req: express.Request, res: express.Response) => {
    userController.login(req, res)
});

apiRoutes.put("/update-user", auth, (req: Request, res: Response) => {
    userController.update(req, res);
});

apiRoutes.get("/search", auth, (req: Request, res: Response) => {
    userController.search(req, res);
});

apiRoutes.get("/user-list", auth, (req: Request, res: Response) => {
    userController.list(req, res);
});

export default apiRoutes;