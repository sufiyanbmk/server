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
exports.addReport = exports.addReview = exports.filterProduct = exports.searchedProduct = exports.getOneProduct = exports.updateProduct = exports.removeProduct = exports.getAllRentedProduct = exports.productAdd = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const managingUrl_1 = require("./managingUrl");
const productAdd = (data, userId, files, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    if (files) {
        data.image = yield Promise.all(files.map((files) => __awaiter(void 0, void 0, void 0, function* () { return yield s3Services.upload(files); })));
    }
    yield dbRepositoryProduct.addProduct(data);
});
exports.productAdd = productAdd;
const getAllRentedProduct = (id, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 10;
    const products = yield dbRepositoryProduct.findByField({ id }, limit);
    const productsWithUrl = yield (0, managingUrl_1.addSignedUrl)(products, s3Services);
    return productsWithUrl;
});
exports.getAllRentedProduct = getAllRentedProduct;
const removeProduct = (id, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield dbRepositoryProduct.deleteOneProduct(id);
    deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.image.map((imageName) => {
        console.log(imageName);
        s3Services.removeFile(imageName);
    });
});
exports.removeProduct = removeProduct;
const updateProduct = (id, data, files, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    if (files) {
        data.image = yield Promise.all(files.map((files) => __awaiter(void 0, void 0, void 0, function* () { return yield s3Services.upload(files); })));
    }
    yield dbRepositoryProduct.editProduct({ id }, data);
});
exports.updateProduct = updateProduct;
const getOneProduct = (id, dbRepositoryProduct, dbRepositoryUser, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield dbRepositoryProduct.getOneProduct(id);
    const productUserDetail = yield dbRepositoryUser.getById(product.userId);
    const userImgUrl = yield s3Services.getFile(productUserDetail === null || productUserDetail === void 0 ? void 0 : productUserDetail.profileImage);
    const fileUrls = yield Promise.all(product.image.map((file) => s3Services.getFile(file)));
    product.set("link", fileUrls, { strict: false });
    productUserDetail.set("image", userImgUrl, { strict: false });
    product.set("user", productUserDetail, { strict: false });
    return product;
});
exports.getOneProduct = getOneProduct;
const searchedProduct = (state, catagory, page, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const searchCretiriya = { state, catagory };
    const products = yield dbRepositoryProduct.getFilteredProduct(searchCretiriya, page);
    const productsWithUrl = yield (0, managingUrl_1.addSignedUrl)(products, s3Services);
    return productsWithUrl;
});
exports.searchedProduct = searchedProduct;
const filterProduct = (searchCretiriya, page, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dbRepositoryProduct.getFilteredProduct(searchCretiriya, page);
    // console.log(products,'products')
    const productsWithUrl = yield (0, managingUrl_1.addSignedUrl)(products, s3Services);
    return productsWithUrl;
});
exports.filterProduct = filterProduct;
const addReview = (data, dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = data;
    const existUser = yield dbRepositoryProduct.checkReview(productId, userId);
    if (existUser.length > 0)
        throw new appError_1.default("this review is already exist", httpStatus_1.HttpStatus.CONFLICT);
    const newReview = yield dbRepositoryProduct.addNewReview(data);
    yield dbRepositoryProduct.updateById(productId, { $push: { reviews: newReview._id } });
});
exports.addReview = addReview;
const addReport = (data, dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = data;
    const existUser = yield dbRepositoryProduct.checkReport(productId, userId);
    if (existUser.length > 10)
        throw new appError_1.default("this review is already exist", httpStatus_1.HttpStatus.CONFLICT);
    const newReport = yield dbRepositoryProduct.addNewReport(data);
    yield dbRepositoryProduct.updateById(productId, { $push: { reports: newReport._id } });
});
exports.addReport = addReport;
