import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authRepository } from '../repositories/auth.repository';
import { RegisterClinicDto, LoginDto } from '../dtos/auth.dto';
import { tokenService } from './token.service';
import { AppError } from '../utils/errors';
import { env } from '../config/env';

export const authService = {
  registerClinic: async (dto: RegisterClinicDto) => {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const { clinic, user } = await authRepository.createClinicWithAdmin({
      clinicName: dto.clinicName,
      clinicEmail: dto.clinicEmail,
      adminEmail: dto.adminEmail,
      adminFirstName: dto.adminFirstName,
      adminLastName: dto.adminLastName,
      passwordHash
    });

    return issueTokens(user.id, clinic.id, user.role);
  },
  login: async (dto: LoginDto) => {
    const user = await authRepository.findUserGlobalByEmail(dto.email);
    if (!user) throw new AppError('Invalid credentials', 401);
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);
    return issueTokens(user.id, user.clinicId, user.role);
  },
  refresh: async (refreshToken: string) => {
    const payload = jwt.verify(refreshToken, env.jwtRefreshSecret) as {
      userId: string;
      clinicId: string;
      role: 'ADMIN' | 'DOCTOR' | 'MANAGER';
    };
    const user = await authRepository.findUserById(payload.userId);
    if (!user) throw new AppError('Invalid refresh token', 401);
    return issueTokens(payload.userId, payload.clinicId, payload.role);
  }
};

const issueTokens = async (userId: string, clinicId: string, role: 'ADMIN' | 'DOCTOR' | 'MANAGER') => {
  const accessToken = tokenService.signAccessToken({ userId, clinicId, role });
  const refreshToken = tokenService.signRefreshToken({ userId, clinicId, role });
  const refreshHash = await bcrypt.hash(refreshToken, 10);
  await authRepository.updateRefreshTokenHash(userId, refreshHash);
  return { accessToken, refreshToken };
};
