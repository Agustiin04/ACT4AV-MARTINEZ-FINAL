
import { Router } from 'express';
import { makeAdmin } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { makeAdminSchema } from '../schemas/admin.schema';

const router = Router();

router.post('/make-admin', 
  authenticate, 
  authorize('admin'),
  validate(makeAdminSchema), 
  makeAdmin
);