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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDbRepository = void 0;
const productDbRepository = (repository) => {
    const getAll = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllProducts(); });
    const getOneProduct = (proId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getProduct(proId); });
    const deleteOneProduct = (proId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteProduct(proId); });
    const reprots = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getReportedProducts(); });
    const getProductCount = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getProductCount(); });
    const getProductGraph = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getProductGraph(); });
    const getPieChartData = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPieChart(); });
    const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addProduct(data); });
    const findByField = (filter, limit) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findByField(filter, limit); });
    const editProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.editProduct(id, data); });
    const getFilteredProduct = (searchCretiriya, page) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(page, 'page');
        const skip = page * 3;
        const products = yield repository.getFilteredProduct(searchCretiriya, skip);
        // console.log(products)
        return products;
    });
    const checkReview = (proId, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findReview(proId, userId); });
    const addNewReview = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addReview(data); });
    const checkReport = (proId, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findReport(proId, userId); });
    const addNewReport = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addReport(data); });
    const updateById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(id, 'l');
        return yield repository.findByIdAndUpdate(id, data);
    });
    return {
        getAll,
        getOneProduct,
        deleteOneProduct,
        reprots,
        getProductCount,
        getProductGraph,
        getPieChartData,
        addProduct,
        findByField,
        editProduct,
        getFilteredProduct,
        checkReview,
        addNewReview,
        checkReport,
        addNewReport,
        updateById
    };
};
exports.productDbRepository = productDbRepository;
