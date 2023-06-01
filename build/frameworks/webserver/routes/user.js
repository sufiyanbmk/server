"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const userController_1 = __importDefault(require("../../../adapters/controllers/userController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const s3Service_1 = require("../../services/s3Service");
const s3ServiceInterface_1 = require("../../../application/services/s3ServiceInterface");
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB, s3Service_1.s3Service, s3ServiceInterface_1.s3ServiceInterface);
    router.route('/profile/:userId')
        .put(multer_1.default.single('image'), controller.profileImg)
        .patch(controller.editProfile);
    return router;
};
exports.default = userRouter;
