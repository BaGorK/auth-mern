export const signup = (req, res) => {
  console.log(req.body);
  return res.status(200).json({ message: 'signup' });
};
