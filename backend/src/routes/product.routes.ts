import { Router } from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { productSchema } from '../schemas/product.schema';

const router = Router();


router.get('/', getAllProducts);
router.get('/:id', getProduct);


router.post('/', authenticate, authorize('ADMIN'), validate(productSchema), createProduct);
router.put('/:id', authenticate, authorize('ADMIN'), validate(productSchema.partial()), updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteProduct);

export default router;