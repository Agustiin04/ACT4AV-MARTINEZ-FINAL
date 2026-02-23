"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(50),
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(1, 'Contraseña es requerida'),
});
