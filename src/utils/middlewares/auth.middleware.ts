import { NextFunction, Response } from 'express';
import { CUSTOM_ERROR_MESSAGES } from '../constants';
import { HttpException } from '../http-exception';
import { getTokenFromRequest } from '../functions/auth.helpers';
import {
  RequestWithUser,
} from '../interfaces/auth.interface';
import FirebaseAdmin from '../../firebase';

export const authMiddleware = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromRequest(req) as string;
  if (!token) {
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.UNAUTHORIZED, 401));
  }
  let payload;
  try {
    payload = await FirebaseAdmin.firebase.auth().verifyIdToken(token);
  } catch (e) {
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403));
  }
  const user = {
    userId: payload.user_id,
  }

  req.user = user;

  return next();
};
