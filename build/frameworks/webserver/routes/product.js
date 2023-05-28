"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const productController_1 = __importDefault(require("../../../adapters/controllers/productController"));
const productDbRepository_1 = require("../../../application/repositories/productDbRepository");
const productRepository_1 = require("../../database/mongoDb/repositories/productRepository");
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const s3Service_1 = require("../../services/s3Service");
const s3ServiceInterface_1 = require("../../../application/services/s3ServiceInterface");
const productRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, productController_1.default)(productDbRepository_1.productDbRepository, productRepository_1.productRepositoryMongoDB, userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB, s3Service_1.s3Service, s3ServiceInterface_1.s3ServiceInterface);
    router.post('/add-product', multer_1.default.array("file"), controller.addProduct);
    router.route('/rented-products/:id')
        .get(controller.getRendedProduct)
        .delete(controller.deleteProduct);
    router.put('/edit-product/:id', multer_1.default.array("file"), controller.editproduct);
    router.get('/product-detail/:id', controller.getSingleProduct);
    router.post('/searched-product', controller.getSearchedProduct);
    router.get('/search-by-name', controller.getProductsByName);
    router.get('/search-by-city', controller.getProductsByCity);
    router.get('/search-by-price', controller.getProductByPrice);
    router.post('/review', controller.createReview);
    router.post('/report', controller.createReport);
    return router;
};
exports.default = productRouter;
