import bcrypt from "bcrypt";

export const SALT_ROUNDS = 10;

export const generateHash = (password: string): string => {
  const hash = bcrypt.hashSync(password, SALT_ROUNDS);
  return hash;
};

export const compareHash = (
  password: string,
  passwordHashed: string
): boolean => {
  return bcrypt.compareSync(password, passwordHashed);
};
