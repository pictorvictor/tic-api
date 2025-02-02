import { Request } from 'express';
import bcrypt from 'bcrypt';

export const getTokenFromRequest = (req: Request) => {
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader?.split(' ')?.[1];
  return token;
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};
