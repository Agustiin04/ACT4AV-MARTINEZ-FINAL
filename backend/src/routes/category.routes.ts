import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { categorySchema } from '../schemas/category.schema';

const router = Router();


router.get('/', getAllCategories);
router.get('/:id', getCategoryById);


router.post('/', 
  authenticate, 
  authorize(['admin']), 
  validate(categorySchema), 
  createCategory
);

router.put('/:id', 
  authenticate, 
  authorize(['admin']), 
  validate(categorySchema.partial()), 
  updateCategory
);

router.delete('/:id', 
  authenticate, 
  authorize(['admin']), 
  deleteCategory
);

export default router;