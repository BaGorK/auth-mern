import User from '../models/userModel.js';
import { hashPassword } from '../utils/passwordUtils.js';

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
    next(error);
  }
};
