const express = require("express");
const postsRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const {
  getFeedPosts,
  getUserPosts,
  createPost,
  likePost,
  commentOnPost,
} = require("../controllers/posts");

postsRouter
  .route("/")
  .get(authMiddleware, getFeedPosts)
  .post(authMiddleware, createPost);

postsRouter.get("/profile", authMiddleware, getUserPosts);
postsRouter.patch("/like", authMiddleware, likePost);
postsRouter.patch("/comment", authMiddleware, commentOnPost);

module.exports = postsRouter;
