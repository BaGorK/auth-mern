import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { customError } from '../utils/customError.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const getAllUsers = (req, res) => {
  return res.send('get all users');
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customError(401, 'You can update only your account!'));
  }

  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    //FIXME: name update not working
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...userWithOutPassword } = updatedUser._doc;
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'update successful',
      data: {
        user: userWithOutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(customError(401, 'You can delete only your account!'));

  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'user deleted successfully',
    });
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
