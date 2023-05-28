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
exports.s3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = __importDefault(require("../../config"));
const crypto_1 = __importDefault(require("crypto"));
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: config_1.default.AWS_ACCESS_KEY,
        secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY
    },
    region: config_1.default.AWS_BUCKET_REGION,
});
const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString('hex');
const s3Service = () => {
    const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
        const key = randomImageName();
        const params = {
            Bucket: config_1.default.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        return key;
    });
    const getFile = (fileKey) => __awaiter(void 0, void 0, void 0, function* () {
        const getObjectParams = {
            Bucket: config_1.default.AWS_BUCKET_NAME,
            Key: fileKey
        };
        const command = new client_s3_1.GetObjectCommand(getObjectParams);
        return yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 60000 });
    });
    const removeFile = (fileKey) => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            Bucket: config_1.default.AWS_BUCKET_NAME,
            Key: fileKey
        };
        const command = new client_s3_1.DeleteObjectCommand(params);
        yield s3.send(command);
    });
    return {
        uploadFile,
        getFile,
        removeFile
    };
};
exports.s3Service = s3Service;
