import { Role } from '@prisma/client';
import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { allowRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.get('/metrics', authMiddleware, allowRoles(Role.ADMIN), adminController.metrics);

export default router;
