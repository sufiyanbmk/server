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
exports.chatDbRepositoryMongoDb = void 0;
const chatModel_1 = __importDefault(require("../models/chatModel"));
const chatDbRepositoryMongoDb = () => {
    const findByField = (critriya) => __awaiter(void 0, void 0, void 0, function* () {
        return yield chatModel_1.default.find(critriya).populate({
            path: "participants",
            select: "username profileImage _id email status",
        });
    });
    const create = (to, from) => __awaiter(void 0, void 0, void 0, function* () { return yield chatModel_1.default.create({ participants: [to, from] }); });
    const findById = (newChat) => __awaiter(void 0, void 0, void 0, function* () { return yield chatModel_1.default.findById(newChat).populate("participants", "username _id email status"); });
    const getMessagesById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield chatModel_1.default.findById(id).select("messages"); });
    const getById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield chatModel_1.default.findById(id); });
    return {
        findByField,
        create,
        findById,
        getMessagesById,
        getById
    };
};
exports.chatDbRepositoryMongoDb = chatDbRepositoryMongoDb;
