import express from "express";
import { PORT, NODE_ENV } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(errorMiddleware);

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/users", userRouter);
app.use("/v1/api/subscriptions", subscriptionRouter);

const port = PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port} in ${NODE_ENV} mode`);

  await assertDatabaseConnection();
});

const assertDatabaseConnection = async () => {
  try {
    await connectDB();
    console.log("Connected to database!");
  } catch (error) {
    console.log("Failed to connect to database:", error);
    process.exit(1);
  }
};

export default app;
