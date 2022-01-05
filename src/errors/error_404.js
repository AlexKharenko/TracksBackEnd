const httpStatusCodes = require('./status_codes');
const BaseError = require('./base_error');

class Error404 extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}

module.exports = Error404;
