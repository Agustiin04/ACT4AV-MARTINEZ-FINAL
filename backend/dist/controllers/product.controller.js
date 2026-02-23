"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const prisma_1 = require("../utils/prisma");
const product_schema_1 = require("../schemas/product.schema");
const getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;
        const where = {};
        if (category)
            where.category = category;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice)
                where.price.gte = parseFloat(minPrice);
            if (maxPrice)
                where.price.lte = parseFloat(maxPrice);
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const products = await prisma_1.prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
exports.getAllProducts = getAllProducts;
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};
exports.getProduct = getProduct;
const createProduct = async (req, res) => {
    try {
        const validatedData = product_schema_1.productSchema.parse(req.body);
        const product = await prisma_1.prisma.product.create({
            data: validatedData
        });
        res.status(201).json(product);
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Error al crear producto' });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = product_schema_1.productSchema.partial().parse(req.body);
        const existingProduct = await prisma_1.prisma.product.findUnique({
            where: { id }
        });
        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const product = await prisma_1.prisma.product.update({
            where: { id },
            data: validatedData
        });
        res.json(product);
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const existingProduct = await prisma_1.prisma.product.findUnique({
            where: { id }
        });
        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await prisma_1.prisma.product.delete({
            where: { id }
        });
        res.json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};
exports.deleteProduct = deleteProduct;
