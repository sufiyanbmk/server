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
exports.catagoryDelete = exports.catagoryAdd = exports.getCatagories = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
// import Catagory from "../../../frameworks/database/mongoDb/models/catagoryModel";
const getCatagories = (dbRepositoryCategory) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryCategory.getAllCatagory(); });
exports.getCatagories = getCatagories;
const catagoryAdd = (catagory, dbRepositoryCatagory) => __awaiter(void 0, void 0, void 0, function* () {
    const findCatagory = yield dbRepositoryCatagory.findCatagory(catagory.title);
    if (findCatagory) {
        throw new appError_1.default('already Exist', httpStatus_1.HttpStatus.CONFLICT);
    }
    yield dbRepositoryCatagory.addNewCatagory(catagory);
});
exports.catagoryAdd = catagoryAdd;
const catagoryDelete = (catagoryId, dbRepositoryCatagory) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryCatagory.deleteOneCatagory(catagoryId); });
exports.catagoryDelete = catagoryDelete;
