import jwt from "jsonwebtoken";

const SECREAT = "jwt-secreate";

export const generateJWT = (data: object): string => {
  const token = jwt.sign(
    {
      data,
    },
    SECREAT,
    { expiresIn: "3h" }
  );
  return token;
};

export const decodeJWT = (token: string): object => {
  const decoded = jwt.decode(token) as object;
  return decoded;
};

export const checkValidationJWT = async (token: string): Promise<boolean> => {
  try {
    await jwt.verify(token, SECREAT);
    return true;
  } catch (err) {
    console.log("token not validate", err);
    return false;
  }
};
