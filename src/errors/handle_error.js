const { Error400, Error404, Error500 } = require('./index');

const handleError = (error) => {
  if (error.statusCode === 400) {
    throw new Error400(error.message);
  } else if (error.statusCode === 404) {
    throw new Error404(error.message);
  } else {
    throw new Error500(error.message);
  }
};

module.exports = handleError;
