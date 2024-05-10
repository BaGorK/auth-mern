export const getAllUsers = (req, res) => {
  return res.send('get all users');
};

export const updateUser = async (req, res, next) => {
  return res.json({ message: 'update user' });
};
