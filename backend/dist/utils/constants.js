"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_in_production';
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
exports.PORT = process.env.PORT || 5000;
