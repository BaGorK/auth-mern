import { StatusCodes } from 'http-status-codes';
import { customError } from './customError.js';
import { verifyJWT } from './tokenUtils.js';
import User from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(customError(StatusCodes.BAD_REQUEST, 'You are not logged in'));

  const decoded = verifyJWT(token);

  if (req.params.id !== decoded.id) {
    return next(customError(StatusCodes.BAD_REQUEST, 'token is invalid'));
  }

  const user = await User.findById(req.params.id);
  if (!user) return next(customError(404, 'there is no user with that id'));
  req.user = user;

  next();
};
