import User from "../models/user.model.js";

const userController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find().select("-password");

      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const findUser = await User.findById(id).select("-password");

      if (!findUser) {
        const error = new Error("User no found");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: findUser,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
