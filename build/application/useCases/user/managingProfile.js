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
exports.profileEdit = exports.uploadNewProfileImg = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const uploadNewProfileImg = (userId, file, dbRepositoryUser, s3Service) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file)
        throw new appError_1.default("there is no image", httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    const profileImg = yield s3Service.upload(file[0]);
    const oldProfileImg = yield dbRepositoryUser.updateImg(userId, profileImg);
    if ((oldProfileImg === null || oldProfileImg === void 0 ? void 0 : oldProfileImg.profileImage) !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
        yield s3Service.removeFile(oldProfileImg === null || oldProfileImg === void 0 ? void 0 : oldProfileImg.profileImage);
    }
    const newProfileImg = yield s3Service.getFile(profileImg);
    return newProfileImg;
});
exports.uploadNewProfileImg = uploadNewProfileImg;
const profileEdit = (userId, updatedField, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryUser.updateDb({ userId }, updatedField); });
exports.profileEdit = profileEdit;
