import { Role } from '@prisma/client';
import { Router } from 'express';
import { patientController } from '../controllers/patient.controller';
import { allowRoles } from '../middlewares/rbac.middleware';
import { auditLog } from '../middlewares/audit.middleware';

const router = Router();

router.get('/', allowRoles(Role.ADMIN, Role.DOCTOR, Role.MANAGER), patientController.list);
router.post('/', allowRoles(Role.ADMIN, Role.MANAGER), auditLog('CREATE', 'PATIENT'), patientController.create);

export default router;
