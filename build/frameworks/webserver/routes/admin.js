"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../../adapters/controllers/adminController"));
const adminDbRepsitory_1 = require("../../../application/repositories/adminDbRepsitory");
const adminRepository_1 = require("../../database/mongoDb/repositories/adminRepository");
const productDbRepository_1 = require("../../../application/repositories/productDbRepository");
const productRepository_1 = require("../../database/mongoDb/repositories/productRepository");
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const catagoryDbRepository_1 = require("../../../application/repositories/catagoryDbRepository");
const catagoryRepository_1 = require("../../database/mongoDb/repositories/catagoryRepository");
const adminRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.default)(adminDbRepsitory_1.adminDbRepository, adminRepository_1.adminRepositoryMongoDB, productDbRepository_1.productDbRepository, productRepository_1.productRepositoryMongoDB, userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB, catagoryDbRepository_1.catagoryRepository, catagoryRepository_1.catagoryRepositoryMongoDb);
    router
        .route("/users")
        .get(controller.getAllUsers)
        .put(controller.blockUser);
    router
        .route("/catagory")
        .get(controller.getAllCatagory)
        .post(controller.addCatagory);
    router.delete("/catagory/:catagoryId", controller.deleteCatagory);
    router.get("/products", controller.getAllProducts);
    router
        .route("/product/:id")
        .get(controller.getSingleProduct)
        .delete(controller.deleteProduct);
    router.get("/reported-product", controller.reportedProduct);
    router.get("/dashboard-data", controller.getDashboardData);
    router.get("/product-graph", controller.getProductGraph);
    router.get("/user-graph", controller.getUserGraph);
    router.get("/pie-chart", controller.pieChartProduct);
    return router;
};
exports.default = adminRouter;
