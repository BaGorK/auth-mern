const globalErrorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // 404 => fail && 500 => error
  const status = (statusCode + '').startsWith('4') ? 'fail' : 'error';

  return res.status(statusCode).json({
    status,
    message,
  });
};

export default globalErrorHandlerMiddleware;
