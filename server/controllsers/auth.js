const { StatusCodes } = require("http-status-codes");
const { BadRequestErr } = require("../errors/errors_index");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    occupation,
    location,
    email,
    password,
    picturePath,
  } = req.body;

  let inputsInfo;

  if (!firstName || !lastName || !email || !password) {
    throw new BadRequestErr("Please fill all the neccessary fields."); // I will mark them in the frontend
  }
  inputsInfo = { firstName, lastName, email, password };
  if (location) {
    inputsInfo = { ...inputsInfo, location };
  }
  if (occupation) {
    inputsInfo = { ...inputsInfo, occupation };
  }
  if (picturePath) {
    inputsInfo = { ...inputsInfo, picturePath };
  }
  // remember, I must write User.create(), not just User()
  let userInfo = await User.create(inputsInfo);

  userInfo = userInfo.removePassword();
  res.status(StatusCodes.CREATED).json({ userInfo });
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestErr("Please provide both your email & password.");
  }

  email = email.toLowerCase();
  let userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new BadRequestErr("There is no user with this email!");
  }
  // I noticed that just the person who has just regestered has the ability to login.
  let isPasswordCorrect = await userInfo.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestErr("you have passed the wrong password.");
  }

  let token = userInfo.createJWT();
  userInfo = userInfo.removePassword();
  res.status(StatusCodes.OK).json({ userInfo, token });
};

module.exports = { registerUser, loginUser };
