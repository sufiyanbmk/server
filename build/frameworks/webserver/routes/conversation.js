"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationController_1 = __importDefault(require("../../../adapters/controllers/conversationController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const zegoCloudServices_1 = require("../../services/zegoCloudServices");
const zegoService_1 = require("../../../application/services/zegoService");
const conversationRepository_1 = require("../../../application/repositories/conversationRepository");
const callRepository_1 = require("../../database/mongoDb/repositories/callRepository");
const conversationRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, conversationController_1.default)(userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB, zegoCloudServices_1.zegoTokenGenerator, zegoService_1.zegoServiceInterface, conversationRepository_1.conversationRepository, callRepository_1.callDbRepositoryMongoDb);
    //call
    router.post("/start-call", controller.startAudioCall);
    router.post("/generate-zego-token", controller.generateZegoToken);
    return router;
};
exports.default = conversationRouter;
