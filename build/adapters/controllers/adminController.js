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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const managingUser_1 = require("../../application/useCases/admin/managingUser");
const managingCatagory_1 = require("../../application/useCases/admin/managingCatagory");
const managingProducts_1 = require("../../application/useCases/admin/managingProducts");
const managingDashboard_1 = require("../../application/useCases/admin/managingDashboard");
const adminController = (adminDbRepository, adminDbRepositoryImpl, productDbRepository, productRepositoryImpl, userDbRepository, userDbRepositoryImpl, catagoryDbRepository, catagoryDbRepositoryImpl) => {
    const DbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const DbRepositoryProduct = productDbRepository(productRepositoryImpl());
    const DbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const DbRepositoryCatagory = catagoryDbRepository(catagoryDbRepositoryImpl());
    const getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, managingUser_1.getUsers)(DbRepositoryUser);
        res.json(users);
    }));
    const blockUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        yield (0, managingUser_1.blockAndUnblockUser)(email, DbRepositoryUser);
        res.json({ status: "success", message: "succefully updated" });
    }));
    const getAllCatagory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const catagory = yield (0, managingCatagory_1.getCatagories)(DbRepositoryCatagory);
        res.json(catagory);
    }));
    const addCatagory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const catagory = req.body;
        yield (0, managingCatagory_1.catagoryAdd)(catagory, DbRepositoryCatagory);
        res.json({ status: "success", message: "succefully added" });
    }));
    const deleteCatagory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { catagoryId } = req.params;
        yield (0, managingCatagory_1.catagoryDelete)(catagoryId, DbRepositoryCatagory);
        res.json({ status: "success", message: "succesfully Deleted" });
    }));
    const getAllProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield (0, managingProducts_1.getProducts)(DbRepositoryProduct);
        res.json(products);
    }));
    const getSingleProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { proId } = req.params;
        const product = yield (0, managingProducts_1.getProduct)(proId, DbRepositoryProduct);
        res.json(product);
    }));
    const deleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { proId } = req.params;
        yield (0, managingProducts_1.removeProduct)(proId, DbRepositoryProduct);
        res.json({ status: "success", message: "Deleted successfuly" });
    }));
    const reportedProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getReportedProduct = yield (0, managingProducts_1.reportedProducts)(DbRepositoryProduct);
        console.log(getReportedProduct, 'rrerer');
        res.json(getReportedProduct);
    }));
    const getDashboardData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getData = yield (0, managingDashboard_1.DashboardData)(DbRepositoryUser, DbRepositoryProduct);
        res.json(getData);
    }));
    const getProductGraph = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getData = yield (0, managingDashboard_1.ProductGraph)(DbRepositoryProduct);
        res.json(getData);
    }));
    const getUserGraph = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getData = yield (0, managingDashboard_1.userGraph)(DbRepositoryUser);
        res.json(getData);
    }));
    const pieChartProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getData = yield (0, managingDashboard_1.pieChart)(DbRepositoryProduct);
        res.json(getData);
    }));
    return {
        getAllUsers,
        blockUser,
        getAllCatagory,
        addCatagory,
        deleteCatagory,
        getAllProducts,
        getSingleProduct,
        deleteProduct,
        reportedProduct,
        getDashboardData,
        getProductGraph,
        getUserGraph,
        pieChartProduct
    };
};
exports.default = adminController;
