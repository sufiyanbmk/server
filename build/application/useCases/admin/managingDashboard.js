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
exports.pieChart = exports.userGraph = exports.ProductGraph = exports.DashboardData = void 0;
const DashboardData = (dbRepositoryUser, dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const [userCount, blockedCount, verifiedCount, productCount] = yield Promise.all([
        dbRepositoryUser.getUserCount(),
        dbRepositoryUser.getCountOf({ isblocked: true }),
        dbRepositoryUser.getCountOf({ verified: true }),
        dbRepositoryProduct.getProductCount(),
    ]);
    const data = {
        userCount,
        blockedCount,
        verifiedCount,
        productCount,
    };
    return data;
});
exports.DashboardData = DashboardData;
const ProductGraph = (dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryProduct.getProductGraph(); });
exports.ProductGraph = ProductGraph;
const userGraph = (dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryUser.getUserGraph(); });
exports.userGraph = userGraph;
const pieChart = (dbRepositoryProduct) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryProduct.getPieChartData(); });
exports.pieChart = pieChart;
