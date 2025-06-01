import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);

authRouter.post("/sign-in", authController.signIn);

authRouter.post("/sign-out", (req, res) => {
  res.send("Sign out");
});

export default authRouter;
