const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(ERROR_BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.statusCode === ERROR_UNAUTHORIZED) {
    return res.status(ERROR_UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.statusCode === ERROR_NOT_FOUND) {
    return res.status(ERROR_NOT_FOUND).send({
      message: err.message,
    });
  }

  return res.status(ERROR_SERVER).send({
    message: "An error has occurred on the server",
  });
};