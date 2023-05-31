"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuredController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const config_1 = __importDefault(require("../../config"));
const managingFeatured_1 = require("../../application/useCases/user/managingFeatured");
const featuredController = (productDbRepository, productRepositoryImpl, stripeServicImpl, stripeServiceInterface, s3ServiceImpl, s3Service) => {
    const DbRepositoryProduct = productDbRepository(productRepositoryImpl());
    const stripeServices = stripeServiceInterface(stripeServicImpl());
    const s3Services = s3Service(s3ServiceImpl());
    const getPublishKey = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ publishableKey: config_1.default.STRIPE_PUBLISHABLE_KEY });
    }));
    const stripePayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentIntent = yield (0, managingFeatured_1.createPayment)(stripeServices);
        res.json({ status: 'success', message: "payment dond",
            clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id
        });
    }));
    const cancelPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { paymentId } = req.body;
        yield (0, managingFeatured_1.abadonPayment)(paymentId, stripeServices);
        res.json({ status: 'success', message: 'payment cancelled' });
    }));
    const updateToFeature = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { proID, plan, price } = req.body;
        yield (0, managingFeatured_1.addPlansFeatures)(proID, plan, price, DbRepositoryProduct);
        res.json({ status: 'success', message: "updated" });
    }));
    const getFeaturedOnlyProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit } = req.query;
        const limitValue = parseInt(limit) || 6;
        const product = yield (0, managingFeatured_1.getAllFeaturedProduct)(limitValue, DbRepositoryProduct, s3Services);
        res.json(product);
    }));
    return {
        getPublishKey,
        stripePayment,
        cancelPayment,
        updateToFeature,
        getFeaturedOnlyProduct
    };
};
exports.featuredController = featuredController;
