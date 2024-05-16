import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { customError } from '../utils/customError.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';

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

  // 1) check if email and password exist
  if (!email || !password)
    return next(customError(403, 'please provide credentials'));

  try {
    // 2) check if a user exists with that email address
    const user = await User.findOne({ email });

    if (!user) return next(customError(404, 'user no found'));

    // 3) check if the password is correct
    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) return next(customError(401, 'Wrong credentials'));

    // 4) sign a new token
    const token = createJWT({ id: user._id });

    // send the user
    const { password: hashedPassword, ...userWithNoPassword } = user._doc;

    // 5) send the token as a cookie
    const oneDay = 24 * 60 * 60 * 1000;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'user successfully logged in',
      data: {
        user: userWithNoPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, photo } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // 1) create and send the jwt
      const token = createJWT({ id: user._id });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'production',
      });

      const { password, ...userWithNoPassword } = user._doc;

      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'user successfully signed in',
        data: {
          user: userWithNoPassword,
        },
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await hashPassword(generatedPassword);

      // create user
      let username = name.split(' ').join('').toLowerCase();

      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
        profilePicture: photo,
      });

      // 1) create and send the jwt
      const token = createJWT({ id: newUser._id });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'production',
      });

      const { password, ...userWithNoPassword } = newUser._doc;

      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'user successfully signed in',
        data: {
          user: userWithNoPassword,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  return res.clearCookie('token').status(StatusCodes.OK).json({
    status: 'success',
    message: 'signed out successfully',
  });
};
