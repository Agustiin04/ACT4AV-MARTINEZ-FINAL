"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Nombre muy corto').max(100),
    description: zod_1.z.string().min(10, 'Descripción muy corta').max(500),
    price: zod_1.z.number().positive('Precio debe ser positivo'),
    stock: zod_1.z.number().int().min(0, 'Stock no puede ser negativo'),
    category: zod_1.z.string().min(2, 'Categoría muy corta'),
    image: zod_1.z.string().url('URL inválida').optional().or(zod_1.z.literal('')),
});
