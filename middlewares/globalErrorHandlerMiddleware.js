const globalErrorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'something went wrong';

  const status = (statusCode + '').startsWith('4') ? 'failed' : 'error';

  return res.status(statusCode).json({
    status,
    message,
  });
};

export default globalErrorHandlerMiddleware;
