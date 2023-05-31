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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const managingConversation_1 = require("../../application/useCases/user/managingConversation");
const conversationController = (userDbRepository, userDbRepositoryImpl, zegoserviceImpl, zegoService, conversationRepositoryImpl, callDbRepositoryMongoDb) => {
    const dbReposoitoryUser = userDbRepository(userDbRepositoryImpl());
    const dbReposoitroyConversation = conversationRepositoryImpl(callDbRepositoryMongoDb());
    const zegoServices = zegoService(zegoserviceImpl());
    const startAudioCall = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { to, from } = req.body;
        const from_user = yield (0, managingConversation_1.findUser)(from, dbReposoitoryUser);
        const to_user = yield (0, managingConversation_1.findUser)(to, dbReposoitoryUser);
        const new_audio_call = yield (0, managingConversation_1.createAudioCall)(to, from, dbReposoitroyConversation);
        res.json({ data: {
                from: to_user,
                roomID: new_audio_call._id,
                streamID: to,
                userID: from,
                userName: from,
            }, });
    }));
    const generateZegoToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, room_id } = req.body;
        const token = yield (0, managingConversation_1.generateToken)(userId, room_id, zegoServices);
        res.json({ status: "success", token });
    }));
    return {
        startAudioCall,
        generateZegoToken
    };
};
exports.default = conversationController;
