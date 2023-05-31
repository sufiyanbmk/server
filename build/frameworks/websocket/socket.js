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
const mangingChat_1 = require("./mangingChat");
const managingCalls_1 = require("./managingCalls");
const socketConfig = (io, authServices) => {
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const res = authServices.verifyToken(socket.handshake.query.token);
            socket.data.userId = res.payload;
            next();
        }
    })
        .on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('user connected in the socket');
        if (socket.data.userId) {
            const status = "Online";
            yield (0, mangingChat_1.changeStatus)(socket.data.userId, socket.id, status);
        }
        socket.on("get_direct_conversations", (callback) => __awaiter(void 0, void 0, void 0, function* () {
            const existing_conversations = yield (0, mangingChat_1.getUsersAleredyChated)(socket.data.userId);
            callback(existing_conversations);
        }));
        socket.on("start_conversation", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const existing_conversations = yield (0, mangingChat_1.checkExistConversation)(data);
            if ((existing_conversations === null || existing_conversations === void 0 ? void 0 : existing_conversations.length) === 0) {
                const new_chat = yield (0, mangingChat_1.createNewChat)(data);
                socket.emit("start_chat", new_chat);
            }
            else {
                socket.emit("start_chat", existing_conversations[0]);
            }
        }));
        socket.on("get_messages", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
            const messages = yield (0, mangingChat_1.getMessages)(data);
            callback(messages);
        }));
        socket.on("text_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield (0, mangingChat_1.textMessage)(data);
            // console.log(newMessage)
            const { toUser, fromUser } = newMessage;
            io.to(toUser === null || toUser === void 0 ? void 0 : toUser.socket_id).emit("new_message", {
                message: newMessage,
            });
            io.to(fromUser === null || fromUser === void 0 ? void 0 : fromUser.socket_id).emit("new_message", {
                message: newMessage,
            });
        }));
        socket.on("file_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield (0, mangingChat_1.fileMessage)(data);
            const { toUser, fromUser } = newMessage;
            io.to(toUser === null || toUser === void 0 ? void 0 : toUser.socket_id).emit("new_message", {
                message: newMessage,
            });
            io.to(fromUser === null || fromUser === void 0 ? void 0 : fromUser.socket_id).emit("new_message", {
                message: newMessage,
            });
        }));
        socket.on("typing", ({ to }) => __awaiter(void 0, void 0, void 0, function* () {
            const toUser = yield (0, mangingChat_1.findUser)(to);
            io.to(toUser === null || toUser === void 0 ? void 0 : toUser.socket_id).emit("typing");
        }));
        socket.on("stop typing", ({ to }) => __awaiter(void 0, void 0, void 0, function* () {
            const toUser = yield (0, mangingChat_1.findUser)(to);
            io.to(toUser === null || toUser === void 0 ? void 0 : toUser.socket_id).emit("stop typing");
        }));
        //calls
        socket.on("audio_call_not_picked", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { to, from } = data;
            const to_user = yield (0, managingCalls_1.callNOtPicked)(data);
            io.to(to_user === null || to_user === void 0 ? void 0 : to_user.socket_id).emit("audio_call_missed", {
                from,
                to,
            });
        }));
        socket.on("start_audio_call", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { from, to, roomID } = data;
            const { to_user, from_user } = yield (0, managingCalls_1.startAudioCall)(data);
            io.to(to_user === null || to_user === void 0 ? void 0 : to_user.socket_id).emit("audio_call_notification", {
                from: from_user,
                roomID,
                streamID: from,
                userID: to,
                userName: to,
            });
        }));
        socket.on("audio_call_accepted", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { to, from } = data;
            const from_user = yield (0, managingCalls_1.callAccepted)(data);
            io.to(from_user === null || from_user === void 0 ? void 0 : from_user.socket_id).emit("audio_call_accepted", {
                from,
                to,
            });
        }));
        socket.on("audio_call_denied", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { to, from } = data;
            const from_user = yield (0, managingCalls_1.callDenied)(data);
            io.to(from_user === null || from_user === void 0 ? void 0 : from_user.socket_id).emit("audio_call_denied", {
                from,
                to,
            });
        }));
        socket.on("user_is_busy_audio_call", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { to, from } = data;
            const from_user = yield (0, managingCalls_1.userIsBusy)(data);
            io.to(from_user === null || from_user === void 0 ? void 0 : from_user.socket_id).emit("on_another_audio_call", {
                from,
                to,
            });
        }));
        socket.on("end", (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("user disconnect the socket");
            const status = data;
            yield (0, mangingChat_1.changeStatus)(socket.data.userId, socket.id, status);
            socket.disconnect(true);
        }));
    }));
};
exports.default = socketConfig;
