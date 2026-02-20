import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env';

export const tokenService = {
  signAccessToken: (payload: { userId: string; clinicId: string; role: string }) =>
    jwt.sign(payload, env.jwtAccessSecret, { expiresIn: '15m' }),
  signRefreshToken: (payload: { userId: string; clinicId: string; role: string }) =>
    jwt.sign({ ...payload, nonce: crypto.randomUUID() }, env.jwtRefreshSecret, { expiresIn: '30d' })
};
