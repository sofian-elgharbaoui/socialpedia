const { StatusCodes } = require("http-status-codes");

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = { BadRequestErr };
