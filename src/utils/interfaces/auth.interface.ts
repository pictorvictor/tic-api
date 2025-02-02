import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestWithUser extends Request {
  user?: UserInfo;
}

export interface UserInfo {
  userId: string;
}

export interface JwtPayloadWithUser extends JwtPayload {
  user?: UserInfo;
}
