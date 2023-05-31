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
exports.conversationRepository = void 0;
const conversationRepository = (repository) => {
    const newOne = (participants, to, from, status) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            participants,
            from,
            to,
            status
        };
        const result = yield repository.create(data);
        return result;
    });
    return {
        newOne,
    };
};
exports.conversationRepository = conversationRepository;
