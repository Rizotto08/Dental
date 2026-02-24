import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patient.routes';
import billingRoutes from './billing.routes';
import adminRoutes from './admin.routes';
import fileRoutes from './file.routes';
import { authMiddleware } from '../middlewares/auth.middleware';
import { tenantMiddleware } from '../middlewares/tenant.middleware';
import { subscriptionGuard } from '../middlewares/subscription.middleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/billing', billingRoutes);
router.use('/patients', authMiddleware, tenantMiddleware, subscriptionGuard, patientRoutes);
router.use('/admin', adminRoutes);
router.use('/files', fileRoutes);

export default router;
