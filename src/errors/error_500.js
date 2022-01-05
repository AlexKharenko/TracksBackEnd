const httpStatusCodes = require('./status_codes');
const BaseError = require('./base_error');

class Error500 extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Internal Server Error',
    isOperational = false
  ) {
    super(message, statusCode, isOperational, description);
  }
}

module.exports = Error500;
