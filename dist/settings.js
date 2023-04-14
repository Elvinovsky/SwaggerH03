"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.settings = {
    MONGO_URI: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET_KEY || '123',
    EMAIL: process.env.AUTH_EMAIL,
    PASS: process.env.AUTH_PASS
};
