const { StatusCodes } = require("http-status-codes");
const { BadRequestErr } = require("../errors/errors_index");
const User = require("../models/User");

const getUser = async (req, res) => {
  const { id } = req.params;

  let userInfo = await User.findById(id).select("-password");
  if (!userInfo) {
    throw new BadRequestErr(`there is no user with this id: ${id}`);
  }

  res.status(StatusCodes.OK).json(userInfo);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, location, occupation } = req.body;
  let dataToUpdate = {};
  if (firstName) dataToUpdate.firstName = firstName;
  if (lastName) dataToUpdate.lastName = lastName;
  if (location) dataToUpdate.location = location;
  if (occupation) dataToUpdate.occupation = occupation;

  const userInfo = await User.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!userInfo) {
    throw new BadRequestErr(`there is no user with this id: ${id}`);
  }

  res.status(StatusCodes.CREATED).json(userInfo);
};

const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new BadRequestErr("There is no user with this email!");
  }

  let isPasswordCorrect = await userInfo.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestErr("You have passed the wrong password!");
  }

  await User.findByIdAndDelete(userInfo._id);
  let fuleName = userInfo.firstName + " " + userInfo.lastName;
  res.status(StatusCodes.CREATED).json(fuleName);
};

const addFriend = async (req, res) => {};
const deleteFriend = async (req, res) => {};

module.exports = { getUser, updateUser, deleteUser, addFriend, deleteFriend };
