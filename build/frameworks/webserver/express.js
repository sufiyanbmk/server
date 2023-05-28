"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("../../config"));
const helmet_1 = __importDefault(require("helmet"));
const expressConfig = (app) => {
    // Development logging
    if (config_1.default.nodeEnv == 'development') {
        app.use((0, morgan_1.default)('dev'));
    }
    app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)({ xssFilter: true }));
};
exports.default = expressConfig;
