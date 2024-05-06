import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { customError } from '../utils/customError.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';
import globalErrorHandlerMiddleware from '../middlewares/globalErrorHandlerMiddleware.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      status: 'success',
      message: 'signup successful',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(customError(401, error?.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1) check if email and password exist
    if (!email || !password) next(customError(403, 'provide credentials'));

    // 2) check if a user exists with that email address
    const user = await User.findOne({ email });
    if (!user) return next(customError(404, ' user no found'));

    // 3) check if the password is correct
    const correctPassword = comparePassword(password, user.password);
    if (!correctPassword) return next(customError(401, 'Wrong credentials'));

    const token = createJWT({ id: user._id });

    const oneDay = 24 * 60 * 60 * 1000;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'user successfully logged in',
    });
  } catch (error) {
    next(error);
  }
};
