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
exports.reportedProducts = exports.removeProduct = exports.getProduct = exports.getProducts = void 0;
const getProducts = (dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryProduct.getAll(); });
exports.getProducts = getProducts;
const getProduct = (proId, dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryProduct.getOneProduct(proId); });
exports.getProduct = getProduct;
const removeProduct = (proId, dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryProduct.deleteOneProduct(proId); });
exports.removeProduct = removeProduct;
const reportedProducts = (dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryProduct.reprots(); });
exports.reportedProducts = reportedProducts;
