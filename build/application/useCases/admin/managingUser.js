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
exports.userGraph = exports.blockAndUnblockUser = exports.getUsers = void 0;
const getUsers = (dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryUser.getAllUsers(); });
exports.getUsers = getUsers;
const blockAndUnblockUser = (email, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () {
    const findedUser = yield dbRepositoryUser.getUserByEmail(email);
    yield dbRepositoryUser.updateDb({ email }, { isblocked: !(findedUser === null || findedUser === void 0 ? void 0 : findedUser.isblocked) });
});
exports.blockAndUnblockUser = blockAndUnblockUser;
const userGraph = (dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryUser.getUserGraph(); });
exports.userGraph = userGraph;
