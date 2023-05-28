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
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addUser(user); });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllUsers(); });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getByEmail(email); });
    const updateDb = (filter, update) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateOne(filter, update); });
    const getUserCount = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUsercount(); });
    const getCountOf = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCountof(filter); });
    const getUserGraph = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserGraph(); });
    const updateImg = (userId, profileImg) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateImg(userId, profileImg); });
    const getById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getById(userId); });
    const getByField = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getByField(filter); });
    return {
        getUserByEmail,
        addUser,
        getAllUsers,
        updateDb,
        getUserCount,
        getCountOf,
        getUserGraph,
        updateImg,
        getById,
        getByField
    };
};
exports.userDbRepository = userDbRepository;
