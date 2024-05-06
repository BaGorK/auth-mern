import bcrypt from 'bcryptjs';

export const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  console.log('salt', salt);

  const hashedPassword = await bcrypt.hash(pass, salt);

  return hashedPassword;
};

export const comparePassword = async (pass, hashedPassword) => {
  const isCorrect = await bcrypt.compare(pass, hashedPassword);

  return isCorrect;
};
