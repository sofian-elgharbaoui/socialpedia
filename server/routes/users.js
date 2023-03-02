const express = require("express");
const usersRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllFriends,
  addRemoveFriend,
} = require("../controllsers/users");

usersRouter
  .route("/:id")
  .get(authMiddleware, getUser)
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

usersRouter.get("/:id/friends", authMiddleware, getAllFriends);

usersRouter.patch("/:id/friends/:friendId", authMiddleware, addRemoveFriend);

module.exports = usersRouter;
