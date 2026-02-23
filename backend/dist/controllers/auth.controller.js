"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../utils/prisma");
const auth_schema_1 = require("../schemas/auth.schema");
const constants_1 = require("../utils/constants");
const register = async (req, res) => {
    try {
        const validatedData = auth_schema_1.registerSchema.parse(req.body);
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email: validatedData.email }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Email ya registrado' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(validatedData.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                ...validatedData,
                password: hashedPassword,
                role: 'USER'
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, constants_1.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, constants_1.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user,
            token,
            refreshToken
        });
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const validatedData = auth_schema_1.loginSchema.parse(req.body);
        // Buscar usuario
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: validatedData.email }
        });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // Verificar contraseña
        const validPassword = await bcryptjs_1.default.compare(validatedData.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // Generar tokens
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, constants_1.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, constants_1.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token,
            refreshToken
        });
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const authReq = req;
        const user = authReq.user;
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener perfil' });
    }
};
exports.getProfile = getProfile;
