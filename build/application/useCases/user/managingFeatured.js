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
exports.getAllFeaturedProduct = exports.addPlansFeatures = exports.abadonPayment = exports.createPayment = void 0;
const managingUrl_1 = require("./managingUrl");
const createPayment = (stripeServices) => __awaiter(void 0, void 0, void 0, function* () { return yield stripeServices.add(1999); });
exports.createPayment = createPayment;
const abadonPayment = (paymentId, stripeServices) => __awaiter(void 0, void 0, void 0, function* () { return yield stripeServices.callOff(paymentId); });
exports.abadonPayment = abadonPayment;
const addPlansFeatures = (proID, plan, price, dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const expireDate = new Date(currentDate.setMonth(currentDate.getMonth() + plan));
    yield dbRepositoryProduct.editProduct({ proID }, { $push: { featured: { plan, price, expireDate } } });
});
exports.addPlansFeatures = addPlansFeatures;
const getAllFeaturedProduct = (limit, dbRepositoryProduct, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dbRepositoryProduct.findByField({ featured: { $exists: true, $ne: [] } }, limit);
    const productsWithUrl = yield (0, managingUrl_1.addSignedUrl)(products, s3Services);
    return productsWithUrl;
});
exports.getAllFeaturedProduct = getAllFeaturedProduct;
