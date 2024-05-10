import { StatusCodes } from 'http-status-codes';
import { jwt } from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const { token } = req.cookie;

  if (!token)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'You are not logged in' });

  jwt.verify(token, token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'token is invalid' });
    req.user = user;
    next();
  });
};
