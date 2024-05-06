import User from '../models/userModel.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({ username, email, password });

  return res.status(200).json({
    status: 'success',
    message: 'signup successful',
    data: {
      user: newUser,
    },
  });
};
