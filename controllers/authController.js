import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { customError } from '../utils/customError.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';

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
    // 1) check if email and apssword exist
    if (!email || !password) throw new Error('provide credentials');

    // 2) check if a user exists with that email address
    const user = await User.findOne({ email });
    if (!user) throw new Error('there is no user wit that password');

    // 3) check if the password is correct
    const correctPassword = comparePassword(password, user.password);
    if (!correctPassword) throw new Error('Wrong credentials');

    return res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};
