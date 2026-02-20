import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { loginSchema, registerClinicSchema } from '../validators/auth.validator';
import { created, ok } from '../utils/response';

export const authController = {
  register: async (req: Request, res: Response) => {
    const dto = registerClinicSchema.parse(req.body);
    const data = await authService.registerClinic(dto);
    return created(res, data, 'Clinic registered');
  },
  login: async (req: Request, res: Response) => {
    const dto = loginSchema.parse(req.body);
    const data = await authService.login(dto);
    return ok(res, data, 'Logged in');
  },
  refresh: async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken as string;
    const data = await authService.refresh(refreshToken);
    return ok(res, data, 'Token rotated');
  }
};
