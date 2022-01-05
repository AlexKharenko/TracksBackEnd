const httpStatusCodes = require('./status_codes');
const BaseError = require('./base_error');

class Error400 extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Bad request',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}

module.exports = Error400;
