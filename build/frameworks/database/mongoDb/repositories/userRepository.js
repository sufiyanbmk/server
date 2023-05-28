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
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepositoryMongoDB = () => {
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        return user;
    });
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModel_1.default.create(user);
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.find(); });
    const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.findOne({ email: email }); });
    const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.updateOne(filter, update); });
    const getUsercount = () => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.countDocuments(); });
    const getCountof = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.countDocuments(filter); });
    const getUserGraph = () => __awaiter(void 0, void 0, void 0, function* () {
        const counts = yield userModel_1.default.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
        return counts;
    });
    const updateImg = (userId, profileImg) => __awaiter(void 0, void 0, void 0, function* () {
        const oldImg = yield userModel_1.default.findByIdAndUpdate({ _id: userId }, { $set: { profileImage: profileImg } }).select("profileImage");
        return oldImg;
    });
    const getById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.findById(userId); });
    const getByField = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.findOne(filter); });
    const findByOneAndUpdate = (userId, filter) => __awaiter(void 0, void 0, void 0, function* () { return yield userModel_1.default.findByIdAndUpdate(userId, filter); });
    return {
        getUserByEmail,
        addUser,
        getAllUsers,
        getByEmail,
        updateOne,
        getUsercount,
        getCountof,
        getUserGraph,
        updateImg,
        getById,
        getByField,
        findByOneAndUpdate
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
