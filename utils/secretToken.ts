import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

dotenv.config();

const tokenKey = process.env.TOKEN_KEY || '';

export const createSecretToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id }, tokenKey, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
