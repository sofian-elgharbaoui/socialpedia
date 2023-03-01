const express = require("express");
const usersRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const { getUser, updateUser, deleteUser } = require("../controllsers/users");

usersRouter
  .route("/:id")
  .get(authMiddleware, getUser)
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

module.exports = usersRouter;
