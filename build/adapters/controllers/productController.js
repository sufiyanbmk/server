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
const managingProduct_1 = require("../../application/useCases/user/managingProduct");
const productController = (productDbRepository, productRepositoryImpl, userDbRepository, userDbRepositoryImpl, s3ServiceImpl, s3Service) => {
    const DbRepositoryProduct = productDbRepository(productRepositoryImpl());
    const dbReposoitoryUser = userDbRepository(userDbRepositoryImpl());
    const s3Services = s3Service(s3ServiceImpl());
    const addProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = JSON.parse(req.body.data);
        const { userId } = req.body;
        const files = req.files;
        yield (0, managingProduct_1.productAdd)(data, userId, files, DbRepositoryProduct, s3Services);
        console.log('hiii');
        res.json({ status: "success", message: "product added" });
    }));
    const getRendedProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rentedProducts = yield (0, managingProduct_1.getAllRentedProduct)(id, DbRepositoryProduct, s3Services);
        res.json(rentedProducts);
    }));
    const deleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        yield (0, managingProduct_1.removeProduct)(id, DbRepositoryProduct, s3Services);
        res.json({ status: "success", message: "deleted succesfully" });
    }));
    const editproduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = JSON.parse(req.body.data);
        const files = req.files;
        yield (0, managingProduct_1.updateProduct)(id, data, files, DbRepositoryProduct, s3Services);
        res.json({ status: "success", message: "updated successfully" });
    }));
    const getSingleProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const singleproduct = yield (0, managingProduct_1.getOneProduct)(id, DbRepositoryProduct, dbReposoitoryUser, s3Services);
        res.json(singleproduct);
    }));
    const getSearchedProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { state, catagory, page } = req.body;
        const data = yield (0, managingProduct_1.searchedProduct)(state, catagory, page, DbRepositoryProduct, s3Services);
        res.json(data);
    }));
    const getProductsByName = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { state, catagory, name, page } = req.query;
        const searchCriteria = { productName: { $regex: `^${name}`, $options: 'i' }, state: state, catagory: catagory };
        const data = yield (0, managingProduct_1.filterProduct)(searchCriteria, page, DbRepositoryProduct, s3Services);
        // console.log(data,'data')
        res.json(data);
    }));
    const getProductsByCity = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { state, catagory, city, page } = req.query;
        const searchCriteria = { city: { $regex: `^${city}`, $options: 'i' }, state: state, catagory: catagory };
        console.log(searchCriteria);
        const data = yield (0, managingProduct_1.filterProduct)(searchCriteria, page, DbRepositoryProduct, s3Services);
        res.json(data);
    }));
    const getProductByPrice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { state, catagory, min, max, page } = req.query;
        const searchCriteria = {
            price: { $gte: min, $lte: max }, state: state, catagory: catagory
        };
        const data = yield (0, managingProduct_1.filterProduct)(searchCriteria, page, DbRepositoryProduct, s3Services);
        res.json(data);
    }));
    const createReview = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        yield (0, managingProduct_1.addReview)(data, DbRepositoryProduct);
        res.json({ status: "success", message: "added successfully" });
    }));
    const createReport = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        yield (0, managingProduct_1.addReport)(data, DbRepositoryProduct);
        res.json({ status: "success", message: "added successfully" });
    }));
    return {
        addProduct,
        getRendedProduct,
        deleteProduct,
        editproduct,
        getSingleProduct,
        getSearchedProduct,
        getProductsByName,
        getProductsByCity,
        getProductByPrice,
        createReview,
        createReport
    };
};
exports.default = productController;
