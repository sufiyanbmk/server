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
exports.generateToken = exports.createAudioCall = exports.findUser = void 0;
const config_1 = __importDefault(require("../../../config"));
const findUser = (id, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () { return yield dbRepositoryUser.getById(id); });
exports.findUser = findUser;
const createAudioCall = (to, from, dbReposoitroyConversation) => __awaiter(void 0, void 0, void 0, function* () {
    const status = "Ongoing";
    const participants = [from, to];
    const new_audio_call = yield dbReposoitroyConversation.newOne(participants, to, from, status);
    return new_audio_call;
});
exports.createAudioCall = createAudioCall;
const generateToken = (userId, room_id, zegoCloud) => __awaiter(void 0, void 0, void 0, function* () {
    const appId = config_1.default.ZEGO_APP_ID;
    const serverSecret = config_1.default.ZEGO_SERVER_SECRET;
    const effectiveTimeInSeconds = 3600;
    const payloadObject = {
        room_id,
        privilege: {
            1: 1,
            2: 1,
        },
        stream_id_list: null,
    };
    const appID = appId * 1;
    const payload = JSON.stringify(payloadObject);
    const token = yield zegoCloud.generate(appID, userId, serverSecret, effectiveTimeInSeconds, payload);
});
exports.generateToken = generateToken;
