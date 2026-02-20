import { Router } from 'express';
import { billingController } from '../controllers/billing.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { tenantMiddleware } from '../middlewares/tenant.middleware';

const router = Router();

router.post('/checkout', authMiddleware, tenantMiddleware, billingController.checkout);
router.post('/webhook', billingController.webhook);

export default router;
