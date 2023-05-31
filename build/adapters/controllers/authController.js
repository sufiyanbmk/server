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
const adminAuth_1 = __importDefault(require("../../application/useCases/auth/adminAuth"));
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const authController = (adminDbRepository, adminDbRepositoryImpl, authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, s3ServiceInterface, s3ServiceImpl, mailServiceImpl, mailServiceInterface, googleAuthServiceInterface, googleAuthServiceImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const s3Service = s3ServiceInterface(s3ServiceImpl());
    const mailServices = mailServiceInterface(mailServiceImpl());
    const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());
    const loginAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const token = yield (0, adminAuth_1.default)(email, password, dbRepositoryAdmin, authService);
        res.json({
            status: "success",
            message: "admin verified",
            token,
        });
    }));
    const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService, mailServices);
        res.json({
            status: "success",
            message: "new user registered",
        });
    }));
    const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userDetails = yield (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, authService, s3Service);
        res.json({
            status: "success",
            message: "user verified",
            userDetails,
        });
    }));
    const loginWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.body;
        const userDetails = yield (0, userAuth_1.signInWithGoogle)(token, googleAuthService, dbRepositoryUser, authService, s3Service);
        res.json({
            status: "success",
            message: "user verified",
            userDetails,
        });
    }));
    const verifiedEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, token } = req.body;
        yield (0, userAuth_1.emailVerification)(userId, token, dbRepositoryUser, authService);
        res.json({ status: "success", message: "user verified" });
    }));
    const forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body.values;
        yield (0, userAuth_1.forgottenPassword)(email, dbRepositoryUser, authService, mailServices);
        res.json({ status: "success", message: "Please check email to verify" });
    }));
    const resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, token } = req.params;
        const { pass } = req.body;
        yield (0, userAuth_1.changePassword)(id, token, pass, dbRepositoryUser, authService);
        res.json({ status: "success", message: "password changed" });
    }));
    const otpLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { accessToken } = req.body;
        const userDetails = yield (0, userAuth_1.loginWithOtp)(accessToken, dbRepositoryUser, authService, s3Service);
        res.json({
            status: "success",
            message: "user verified",
            userDetails,
        });
    }));
    return {
        loginAdmin,
        registerUser,
        loginUser,
        verifiedEmail,
        loginWithGoogle,
        forgotPassword,
        resetPassword,
        otpLogin,
    };
};
exports.default = authController;
