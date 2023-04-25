const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const {
  getUser,
  getFriend,
  getAllFriends,
  getAllUsers,
  updateUser,
  deleteUser,
  addRemoveFriend,
} = require("../controllers/user");

userRouter
  .route("/")
  .get(authMiddleware, getUser)
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

userRouter.get("/all", authMiddleware, getAllUsers);

userRouter.get("/friends", authMiddleware, getAllFriends);
userRouter.get("/friends/:friendId", authMiddleware, getFriend);
userRouter.patch("/friends/:friendId", authMiddleware, addRemoveFriend);

module.exports = userRouter;
