"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    ORGIN_PORT: process.env.ORGIN_PORT,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    mongoDbUrl: process.env.MONGODBURL,
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    googleAuthClient: process.env.GOOGLE_AUTH_CLIENT,
    OAuth2_CLIENT_ID: process.env.oAuth2_CLIENT_ID,
    OAuth2_CLIENT_SECRECT: process.env.oAuth2_CLIENT_SECRECT,
    OAuth2_RIDERECT_URI: process.env.oAuth2_RIDERECT_URI,
    OAuth2_REFRESH_TOKEN: process.env.oAuth2_REFRESH_TOKEN,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECERET_KEY: process.env.STRIPE_SECERET_KEY,
    ZEGO_APP_ID: process.env.ZEGO_APP_ID,
    ZEGO_SERVER_SECRET: process.env.ZEGO_SERVER_SECRET,
};
exports.default = configKeys;
