import { Router } from 'express';
import { fileController } from '../controllers/file.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { tenantMiddleware } from '../middlewares/tenant.middleware';
import { subscriptionGuard } from '../middlewares/subscription.middleware';

const router = Router();
router.post('/presigned-url', authMiddleware, tenantMiddleware, subscriptionGuard, fileController.createUploadUrl);

export default router;
