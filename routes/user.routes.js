import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.post("/", (req, res) => {
  res.send("POST User");
});

userRouter.put("/:id", (req, res) => {
  res.send("User");
});

userRouter.delete("/:id", (req, res) => {
  res.send("DELETE User");
});

export default userRouter;
