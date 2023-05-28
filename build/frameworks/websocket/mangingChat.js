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
exports.findUser = exports.fileMessage = exports.textMessage = exports.getMessages = exports.createNewChat = exports.checkExistConversation = exports.getUsersAleredyChated = exports.changeStatus = void 0;
const userRepository_1 = require("../database/mongoDb/repositories/userRepository");
const chatRepository_1 = require("../database/mongoDb/repositories/chatRepository");
const s3Service_1 = require("../services/s3Service");
const changeStatus = (userId, socket_id, status) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, userRepository_1.userRepositoryMongoDB)().findByOneAndUpdate(userId, { socket_id, status }); });
exports.changeStatus = changeStatus;
const getUsersAleredyChated = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const critriya = { participants: { $all: [userId] } };
        const existingConversations = yield (0, chatRepository_1.chatDbRepositoryMongoDb)().findByField(critriya);
        const participantsWithImageUrls = yield Promise.all(existingConversations[0].participants.map((x) => __awaiter(void 0, void 0, void 0, function* () {
            x.profileImage = yield (0, s3Service_1.s3Service)().getFile(x.profileImage);
            return x;
        })));
        return existingConversations;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUsersAleredyChated = getUsersAleredyChated;
const checkExistConversation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { to, from } = data;
    const critriya = { participants: { $size: 2, $all: [to, from] } };
    try {
        const existingConversations = yield (0, chatRepository_1.chatDbRepositoryMongoDb)().findByField(critriya);
        if (existingConversations.length > 0) {
            const participantsWithImageUrls = yield Promise.all((_a = existingConversations[0]) === null || _a === void 0 ? void 0 : _a.participants.map((x) => __awaiter(void 0, void 0, void 0, function* () {
                x.profileImage = yield (0, s3Service_1.s3Service)().getFile(x.profileImage);
                return x;
            })));
        }
        return existingConversations;
    }
    catch (err) {
        console.log(err);
    }
});
exports.checkExistConversation = checkExistConversation;
const createNewChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = data;
    try {
        let newChat = yield (0, chatRepository_1.chatDbRepositoryMongoDb)().create(to, from);
        newChat = yield (0, chatRepository_1.chatDbRepositoryMongoDb)().findById(newChat);
        return newChat;
    }
    catch (err) {
        console.log(err);
    }
});
exports.createNewChat = createNewChat;
const getMessages = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, chatRepository_1.chatDbRepositoryMongoDb)().getMessagesById(data.conversation_id); });
exports.getMessages = getMessages;
const textMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, conversation_id, from, to, type } = data;
    try {
        console.log(from);
        const toUser = yield (0, userRepository_1.userRepositoryMongoDB)().getById(to);
        const fromUser = yield (0, userRepository_1.userRepositoryMongoDB)().getById(from);
        const new_message = {
            to,
            from,
            type,
            created_at: new Date(),
            text: message,
            toUser,
            fromUser,
            conversation_id
        };
        const chat = yield (0, chatRepository_1.chatDbRepositoryMongoDb)().getById(conversation_id);
        chat === null || chat === void 0 ? void 0 : chat.messages.push(new_message);
        if (chat) {
            yield chat.save({
                validateModifiedOnly: true
            });
        }
        return new_message;
    }
    catch (err) {
        console.log(err);
    }
});
exports.textMessage = textMessage;
const fileMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, conversation_id, from, to, type } = data;
    try {
        const toUser = yield (0, userRepository_1.userRepositoryMongoDB)().getById(to);
        const fromUser = yield (0, userRepository_1.userRepositoryMongoDB)().getById(from);
        const key = yield (0, s3Service_1.s3Service)().uploadFile(message);
        const imgLink = yield (0, s3Service_1.s3Service)().getFile(key);
        const Media = type;
        const new_message = {
            to,
            from,
            type: Media,
            created_at: new Date(),
            text: imgLink,
            toUser,
            fromUser,
            conversation_id
        };
        let chat = yield (0, chatRepository_1.chatDbRepositoryMongoDb)().getById(conversation_id);
        chat === null || chat === void 0 ? void 0 : chat.messages.push(new_message);
        if (chat) {
            yield chat.save({
                validateModifiedOnly: true
            });
        }
        return new_message;
    }
    catch (err) {
        console.log(err);
    }
});
exports.fileMessage = fileMessage;
const findUser = (to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toUser = yield (0, userRepository_1.userRepositoryMongoDB)().getById(to);
    }
    catch (err) {
        console.log(err);
    }
});
exports.findUser = findUser;
