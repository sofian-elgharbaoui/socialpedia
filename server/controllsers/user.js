const User = require("../models/User");
const { BadRequestErr } = require("../errors/errors_index");
const { StatusCodes } = require("http-status-codes");
// I must add the NEXT argument, to let this function throw errors to the next middleware wich is errors_handler
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, picturePath } = req.body;

  if (!firstName || !lastName || !email || !password)
    throw new BadRequestErr("Please fill all the fields.");

  // remember, I must write User.create(), not just User()
  const userInfo = await User.create({
    firstName,
    lastName,
    email,
    password,
    picturePath,
  });

  res.status(StatusCodes.CREATED).json(userInfo);
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestErr("Please provide both your email & password.");

  email = email.toLowerCase();
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new BadRequestErr("you have passed the wrong email.");
  }
  const isPasswordCorrect = await userInfo.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestErr("you have passed the wrong password.");
  }
  let token = userInfo.createJWT(); // the problem is here
  res.status(StatusCodes.OK).json({ userInfo, token });
};

const getUser = async (req, res) => {};

module.exports = { registerUser, loginUser, getUser };
