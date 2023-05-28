"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const featuredController_1 = require("../../../adapters/controllers/featuredController");
const productDbRepository_1 = require("../../../application/repositories/productDbRepository");
const productRepository_1 = require("../../database/mongoDb/repositories/productRepository");
const stripeService_1 = require("../../services/stripeService");
const stripeServiceInterface_1 = require("../../../application/services/stripeServiceInterface");
const s3Service_1 = require("../../services/s3Service");
const s3ServiceInterface_1 = require("../../../application/services/s3ServiceInterface");
const featuredRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, featuredController_1.featuredController)(productDbRepository_1.productDbRepository, productRepository_1.productRepositoryMongoDB, stripeService_1.stripeService, stripeServiceInterface_1.stripeServiceInterface, s3Service_1.s3Service, s3ServiceInterface_1.s3ServiceInterface);
    router.get('/config', controller.getPublishKey);
    router.post('/create-payment-intent', controller.stripePayment);
    router.post('/cancel-payment', controller.cancelPayment);
    router.patch('/update-feature', controller.updateToFeature);
    router.get('/home-product', controller.getFeaturedOnlyProduct);
    return router;
};
exports.default = featuredRouter;
