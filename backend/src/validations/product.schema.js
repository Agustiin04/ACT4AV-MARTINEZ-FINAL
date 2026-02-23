const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().positive('El precio debe ser positivo'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  category: z.string().min(1, 'La categoría es requerida'),
  image: z.string().url('URL inválida').optional(),
  discount: z.number().min(0).max(100).optional().default(0)
});


const updateProductSchema = createProductSchema.partial();

const validateProduct = (req, res, next) => {
  try {
 
    const data = { ...req.body };
    
    if (data.price && typeof data.price === 'string') {
      data.price = parseFloat(data.price);
    }
    
    if (data.stock && typeof data.stock === 'string') {
      data.stock = parseInt(data.stock);
    }
    
    if (data.discount && typeof data.discount === 'string') {
      data.discount = parseFloat(data.discount);
    }
    
    const validatedData = createProductSchema.parse(data);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: error.errors?.map(err => ({
        field: err.path[0],
        message: err.message
      })) || ['Datos inválidos']
    });
  }
};


const validateUpdateProduct = (req, res, next) => {
  try {
    const data = { ...req.body };
    
    if (data.price && typeof data.price === 'string') {
      data.price = parseFloat(data.price);
    }
    
    if (data.stock && typeof data.stock === 'string') {
      data.stock = parseInt(data.stock);
    }
    
    if (data.discount && typeof data.discount === 'string') {
      data.discount = parseFloat(data.discount);
    }
    
    const validatedData = updateProductSchema.parse(data);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: error.errors?.map(err => ({
        field: err.path[0],
        message: err.message
      })) || ['Datos inválidos']
    });
  }
};


module.exports = {
  validateProduct,
  validateUpdateProduct,
  createProductSchema,
  updateProductSchema
};