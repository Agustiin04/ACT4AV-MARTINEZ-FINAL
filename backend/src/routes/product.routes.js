const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { validateProduct, validateUpdateProduct } = require('../validations/product.schema');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

router.post('/', authenticate, authorize(['admin']), validateProduct, productController.createProduct);
router.put('/:id', authenticate, authorize(['admin']), validateUpdateProduct, productController.updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), productController.deleteProduct);

module.exports = router;