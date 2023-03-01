const express = require("express");
const userRouter = express.Router();

const { registerUser, loginUser, getUser } = require("../controllsers/user");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUser);

module.exports = userRouter;
