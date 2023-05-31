"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const featured_1 = __importDefault(require("./featured"));
const conversation_1 = __importDefault(require("./conversation"));
const routes = (app) => {
    app.use('/api/auth', (0, auth_1.default)());
    app.use('/api/admin', (0, admin_1.default)());
    app.use('/api/user', (0, user_1.default)());
    app.use('/api/products', (0, product_1.default)());
    app.use('/api/featured', (0, featured_1.default)());
    app.use('/api/call', (0, conversation_1.default)());
};
exports.default = routes;
