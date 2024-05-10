import { customError } from '../utils/customError.js';

export const getAllUsers = (req, res) => {
  return res.send('get all users');
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(customError(401, 'You can update only your account!'));

  return res.json({ message: 'update user' });
};
