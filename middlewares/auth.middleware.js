import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    const findUser = await User.findById(decodedToken.id);

    if (!findUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    req.user = findUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
