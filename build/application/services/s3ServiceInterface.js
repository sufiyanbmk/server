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
exports.s3ServiceInterface = void 0;
const s3ServiceInterface = (service) => {
    const upload = (file) => __awaiter(void 0, void 0, void 0, function* () { return yield service.uploadFile(file); });
    const getFile = (fileKey) => __awaiter(void 0, void 0, void 0, function* () { return yield service.getFile(fileKey); });
    const removeFile = (fileKey) => __awaiter(void 0, void 0, void 0, function* () { return yield service.removeFile(fileKey); });
    return {
        upload,
        getFile,
        removeFile
    };
};
exports.s3ServiceInterface = s3ServiceInterface;
