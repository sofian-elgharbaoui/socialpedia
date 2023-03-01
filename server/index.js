// call packages
const express = require("express");
const bodyParcer = require("body-parser");
const { default: helmet } = require("helmet");
const cors = require("cors");
const multer = require("multer");

// connect to db
const connectDB = require("./db/connectDB");
/*
Why I MUST declare the "express-async-errors" package before the errorsHandler middleware?
Answer: I had to do that because I was using the "express-async-errors" that
holds my errors in my errorsHandler,
To conslude, I have to declare something (e.i. package, etc) first if I want to use it in any middleware;
I ALLWAYS have to write the configuration just after the packages.
*/

// configuration
const app = express();
require("dotenv").config();
require("express-async-errors");
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParcer.json({ limit: "30mb", extended: true }));
app.use(bodyParcer.urlencoded({ limit: "30mb", extended: true }));

// middlewares
const errorsHandler = require("./middlewares/errors_handler");

// routers
const userRouter = require("./routes/user");

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.use("/user", userRouter);

app.use(errorsHandler);

const port = process.env.PORT || 3001;
(async function () {
  try {
    await connectDB(process.env.URI);
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
})();
