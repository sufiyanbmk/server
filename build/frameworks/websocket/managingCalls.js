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
exports.userIsBusy = exports.callDenied = exports.callAccepted = exports.startAudioCall = exports.callNOtPicked = void 0;
const userRepository_1 = require("../database/mongoDb/repositories/userRepository");
const callRepository_1 = require("../database/mongoDb/repositories/callRepository");
const callNOtPicked = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = data;
    const to_user = yield (0, userRepository_1.userRepositoryMongoDB)().getById(to);
    const firstParmeter = {
        participants: { $size: 2, $all: [to, from] },
    };
    const secondParameter = { verdict: "Missed", status: "Ended", endedAt: Date.now() };
    yield (0, callRepository_1.callDbRepositoryMongoDb)().findOneAndUpdate(firstParmeter, secondParameter);
    return to_user;
});
exports.callNOtPicked = callNOtPicked;
const startAudioCall = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = data;
    const to_user = yield (0, userRepository_1.userRepositoryMongoDB)().getById(to);
    const from_user = yield (0, userRepository_1.userRepositoryMongoDB)().getById(from);
    return ({ to_user, from_user });
});
exports.startAudioCall = startAudioCall;
const callAccepted = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = data;
    const from_user = yield (0, userRepository_1.userRepositoryMongoDB)().getById(from);
    const firstParmeter = {
        participants: { $size: 2, $all: [to, from] },
    };
    const secondParameter = { verdict: "Accepted" };
    yield (0, callRepository_1.callDbRepositoryMongoDb)().findOneAndUpdate(firstParmeter, secondParameter);
    return from_user;
});
exports.callAccepted = callAccepted;
const callDenied = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = data;
    const firstParmeter = {
        participants: { $size: 2, $all: [to, from] },
    };
    const secondParameter = { verdict: "Denied", status: "Ended", endedAt: Date.now() };
    yield (0, callRepository_1.callDbRepositoryMongoDb)().findOneAndUpdate(firstParmeter, secondParameter);
    const from_user = yield (0, userRepository_1.userRepositoryMongoDB)().getById(from);
    return from_user;
});
exports.callDenied = callDenied;
const userIsBusy = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = data;
    const firstParmeter = {
        participants: { $size: 2, $all: [to, from] },
    };
    const secondParameter = { verdict: "Busy", status: "Ended", endedAt: Date.now() };
    yield (0, callRepository_1.callDbRepositoryMongoDb)().findOneAndUpdate(firstParmeter, secondParameter);
    const from_user = yield (0, userRepository_1.userRepositoryMongoDB)().getById(from);
    return from_user;
});
exports.userIsBusy = userIsBusy;
