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
exports.productRepositoryMongoDB = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const reportModel_1 = __importDefault(require("../models/reportModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const productRepositoryMongoDB = () => {
    const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.find(); });
    const getProduct = (proId) => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.findById(proId).populate({ path: 'reviews', model: 'Reviews' }); });
    const deleteProduct = (proId) => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.findByIdAndDelete(proId); });
    const getReportedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield productModel_1.default.find({ reports: { $size: 1 } })
            .populate({
            path: "reports",
            select: "username report",
            model: "Reports",
        });
        return data;
    });
    const getProductCount = () => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.countDocuments(); });
    const getProductGraph = () => __awaiter(void 0, void 0, void 0, function* () {
        const counts = yield productModel_1.default.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
        return counts;
    });
    const getPieChart = () => __awaiter(void 0, void 0, void 0, function* () {
        const featuredProduct = yield productModel_1.default.countDocuments({ featured: { $exists: true, $ne: [] } });
        const product = yield productModel_1.default.countDocuments({ featured: { $size: 0 } });
        return { product: product, featuredProduct: featuredProduct };
    });
    const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.create(data); });
    const findByField = (filter, limit) => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.find(filter).limit(limit).sort({ createdAt: -1 }); });
    const editProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.updateOne(id, data); });
    const getFilteredProduct = (searchCretiriya, skip) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productModel_1.default.find(searchCretiriya)
            .sort({ featured: -1, createdAt: -1 })
            .populate({ path: 'reviews', model: reviewModel_1.default })
            .skip(skip).limit(3);
        return product;
    });
    const findReview = (proId, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield reviewModel_1.default.find({ proId, userId }); });
    const addReview = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield reviewModel_1.default.create(data); });
    const findReport = (proId, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield reportModel_1.default.find({ proId, userId }); });
    const addReport = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield reportModel_1.default.create(data); });
    const findByIdAndUpdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return yield productModel_1.default.findByIdAndUpdate(id, data); });
    return {
        getAllProducts,
        getProduct,
        deleteProduct,
        getReportedProducts,
        getProductCount,
        getProductGraph,
        getPieChart,
        addProduct,
        findByField,
        editProduct,
        getFilteredProduct,
        findReview,
        addReview,
        findReport,
        addReport,
        findByIdAndUpdate
    };
};
exports.productRepositoryMongoDB = productRepositoryMongoDB;
