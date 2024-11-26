import { Router } from "express";
import userController from "../controllers/product.controller";

const userRouter = Router();

userRouter.get("/", userController.queryProducts);
userRouter.post("/create", userController.createProduct);
userRouter.put("/update", userController.updateProduct);
userRouter.delete("/delete", userController.deleteProduct);

export default userRouter;
