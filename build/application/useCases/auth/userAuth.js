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
exports.loginWithOtp = exports.changePassword = exports.forgottenPassword = exports.emailVerification = exports.signInWithGoogle = exports.userLogin = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userRegister = (user, userRepository, authService, mailService) => __awaiter(void 0, void 0, void 0, function* () {
    user.email = user.email.toLowerCase();
    const isExistingEmail = yield userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = yield authService.encryptPassword(user.password);
    const { _id: userId } = yield userRepository.addUser(user);
    const token = authService.generateToken(userId.toString());
    const link = `http://localhost:3000/verify-email/${userId}/${token}`;
    const mailOpt = {
        from: "RENT <RENT@gmail.com>",
        to: "sufiyanbmk01@gmail.com",
        subject: "VERIFY EMAIL",
        text: `Your Verify Email Link is:${link}`,
        html: `<hi>Your Verify Email Link is:${link}</h1>`,
    };
    mailService.sendMail(mailOpt);
});
exports.userRegister = userRegister;
const userLogin = (email, password, userRepository, authService, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (user.isGoogleUser) {
        throw new appError_1.default("You are logged in using Google Auth", 401);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, your password was incorrect. Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    const userDetails = {
        id: user._id,
        email: user.email,
        userName: user.userName,
        profileImage: user.profileImage,
        token: token
    };
    if (user.profileImage !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
        let url = yield s3Services.getFile(user.profileImage);
        userDetails.profileImage = url;
    }
    return userDetails;
});
exports.userLogin = userLogin;
const signInWithGoogle = (token, googleAuthService, userRepository, authService, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield googleAuthService.verify(token);
    const isUserExist = yield userRepository.getUserByEmail(user.email);
    if (isUserExist) {
        const token = authService.generateToken(isUserExist._id.toString());
        const userDetails = {
            id: isUserExist._id,
            email: isUserExist.email,
            userName: isUserExist.userName,
            profileImage: isUserExist.profileImage,
            imgLink: isUserExist.imgLink,
            token: token
        };
        if (isUserExist.profileImage !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
            let url = yield s3Services.getFile(isUserExist.profileImage);
            userDetails.profileImage = url;
        }
        return userDetails;
    }
    else {
        const data = yield userRepository.addUser(user);
        const token = authService.generateToken(data._id.toString());
        const userDetails = {
            id: data._id,
            email: data.email,
            userName: data.userName,
            profileImage: data.profileImage,
            token: token
        };
        return userDetails;
    }
});
exports.signInWithGoogle = signInWithGoogle;
const emailVerification = (userId, token, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getById(userId);
    if (!user)
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    try {
        const payload = authService.verifyPassword(token);
    }
    catch (err) {
        throw new appError_1.default("UnAuthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    yield userRepository.updateDb({ _id: user._id }, { isverified: true });
});
exports.emailVerification = emailVerification;
const forgottenPassword = (email, userRepository, authService, mailService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user)
        throw new appError_1.default("this email doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    const token = authService.generateToken(user._id.toString());
    const link = `${process.env.ORGIN_PORT}/reset-password/${user._id}/${token}`;
    const mailOpt = {
        from: "RENT <RENT@gmail.com>",
        to: email,
        subject: "VERIFY EMAIL",
        text: `Your Verify Email Link is:${link}`,
        html: `<hi>Your Verify Email Link is:${link}</h1>`,
    };
    mailService.sendMail(mailOpt);
});
exports.forgottenPassword = forgottenPassword;
const changePassword = (id, token, password, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getById(id);
    if (!user)
        throw new appError_1.default("this email doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    try {
        const payload = authService.verifyPassword(token);
    }
    catch (err) {
        throw new appError_1.default("UnAuthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const hashedPassword = yield authService.encryptPassword(password);
    yield userRepository.updateDb({ _id: user._id }, { password: hashedPassword });
});
exports.changePassword = changePassword;
const loginWithOtp = (accessToken, userRepository, authService, s3Services) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = authService.decode(accessToken);
    const sanitizedPhoneNumber = decoded.phone_number.replace('+91', '');
    const user = yield userRepository.getByField({ phone: sanitizedPhoneNumber });
    if (!user)
        throw new appError_1.default("this phoneNumber doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    const token = authService.generateToken(user._id.toString());
    const userDetails = {
        id: user._id,
        email: user.email,
        userName: user.userName,
        profileImage: user.profileImage,
        imgLink: user.imgLink,
        token: token
    };
    if (user.profileImage !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
        let url = yield s3Services.getFile(user.profileImage);
        userDetails.profileImage = url;
    }
    return userDetails;
});
exports.loginWithOtp = loginWithOtp;
