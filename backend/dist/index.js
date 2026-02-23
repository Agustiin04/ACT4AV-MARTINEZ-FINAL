"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Content-Length", "X-Request-ID"],
    maxAge: 86400
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log("Origin:", req.headers.origin);
    console.log("Headers:", req.headers);
    next();
});
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "E-commerce API running",
        timestamp: new Date().toISOString(),
        cors: "enabled"
    });
});
app.post("/api/auth/login", (req, res) => {
    console.log("📨 Login request received");
    console.log("Body:", req.body);
    const { email, password } = req.body;
    const users = [
        {
            email: "admin@example.com",
            password: "admin123",
            name: "Administrador",
            role: "ADMIN",
            id: "admin-123"
        },
        {
            email: "usuario@example.com",
            password: "user123",
            name: "Usuario Normal",
            role: "USER",
            id: "user-456"
        }
    ];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        console.log("✅ Login successful for:", user.email);
        res.json({
            message: "Login exitoso",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token: "jwt-token-fake-" + Date.now(),
            refreshToken: "refresh-token-fake-" + Date.now()
        });
    }
    else {
        console.log("❌ Login failed for:", email);
        res.status(401).json({
            error: "Credenciales inválidas",
            hint: "Usa: admin@example.com/admin123 o usuario@example.com/user123"
        });
    }
});
app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    console.log("📨 Register request:", email);
    res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
            id: "new-user-" + Date.now(),
            email,
            name,
            role: "USER"
        },
        token: "jwt-token-new-user",
        refreshToken: "refresh-token-new-user"
    });
});
app.get("/api/products", (req, res) => {
    const products = [
        {
            id: "prod-1",
            name: "Laptop Gaming Pro",
            description: "Laptop de alto rendimiento para gaming",
            price: 1499.99,
            stock: 15,
            category: "Electrónica",
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: "prod-2",
            name: "Auriculares Bluetooth Premium",
            description: "Cancelación de ruido activa y 30h de batería",
            price: 249.99,
            stock: 8,
            category: "Audio",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: "prod-3",
            name: "Smartwatch Pro Max",
            description: "Monitoreo de salud avanzado y GPS integrado",
            price: 399.99,
            stock: 0,
            category: "Wearables",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];
    res.json(products);
});
app.use("*", (req, res) => {
    console.log("❌ 404 - Ruta no encontrada:", req.originalUrl);
    res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl,
        method: req.method
    });
});
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(500).json({
        error: "Error interno del servidor",
        message: err.message
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Login: http://localhost:${PORT}/api/auth/login`);
    console.log(`🛒 Products: http://localhost:${PORT}/api/products`);
    console.log(`🌐 CORS habilitado para: http://localhost:3000`);
});
