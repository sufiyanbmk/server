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
exports.catagoryRepository = void 0;
const catagoryRepository = (repository) => {
    const getAllCatagory = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllCatagory(); });
    const findCatagory = (catagory) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findCatagory(catagory); });
    const addNewCatagory = (catagory) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addNewCatagory(catagory); });
    const deleteOneCatagory = (catagoryId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteOneCatagory(catagoryId); });
    return {
        getAllCatagory,
        findCatagory,
        addNewCatagory,
        deleteOneCatagory
    };
};
exports.catagoryRepository = catagoryRepository;
