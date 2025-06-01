import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

const authController = {
  signUp: async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        const error = new Error("Name, email and password are required");
        error.statusCode = 400;
        throw error;
      }

      const findUser = await User.findOne({ email });

      if (findUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUsers = await User.create(
        [
          {
            name,
            email,
            password: hashedPassword,
          },
        ],
        { session }
      );

      const token = jwt.sign(
        {
          id: newUsers[0]._id,
          name: newUsers[0].name,
          email: newUsers[0].email,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          access_token: token,
        },
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
      }

      const findUser = await User.findOne({ email });

      if (!findUser) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          id: findUser._id,
          name: findUser.name,
          email: findUser.email,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );

      res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
          access_token: token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
