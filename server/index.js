// call packages
const path = require("path");
const express = require("express");
const { default: helmet } = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const app = express();
const httpServer = http.createServer(app);

const connectDB = require("./db/connectDB");

// configuration
require("dotenv").config();
require("express-async-errors");
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

// error middleware
const errorsHandler = require("./middlewares/errors_handler");

// establish the chat
require("./controllers/chatServer")(httpServer);

// routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
});

app.use("/posts", postsRouter);
// I put this middleware below, So I don't want to see the posts route logges
app.use(morgan("common"));
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorsHandler);

// connect to db
const port = process.env.PORT || 3001;
(async function () {
  try {
    await connectDB(process.env.URI);
    // the problem was here, so the connecction didn't want to extablish
    httpServer.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
})();
