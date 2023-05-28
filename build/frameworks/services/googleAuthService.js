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
exports.googleAuthService = void 0;
const googleapis_1 = require("googleapis");
const googleAuthService = () => {
    const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            userName: "",
            email: "",
            isGoogleUser: true,
            isverified: true
        };
        const oauth2Client = new googleapis_1.google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token });
        const userinfo = googleapis_1.google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        const res = yield userinfo.userinfo.get();
        const userDetails = res.data;
        if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.given_name) && userDetails.family_name && userDetails.email) {
            user.userName = userDetails.given_name;
            user.email = userDetails.email;
        }
        return user;
    });
    return {
        verify
    };
};
exports.googleAuthService = googleAuthService;
