import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { customError } from './customError.js';

export const verifyToken = (req, res, next) => {
  const { token } = req.cookie;

  if (!token)
    return next(customError(StatusCodes.BAD_REQUEST, 'You are not logged in'));

  jwt.verify(token, token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return next(customError(StatusCodes.BAD_REQUEST, 'token is invalid'));

    req.user = user;
    next();
  });
};
