import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import adminLogin from "../../application/useCases/auth/adminAuth";
import { AdminDbInterface } from "../../application/repositories/adminDbRepsitory";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/adminRepository";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import {
  userLogin,
  userRegister,
  emailVerification,
  signInWithGoogle,
  forgottenPassword,
  changePassword,
  loginWithOtp,
} from "../../application/useCases/auth/userAuth";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepository";
import { S3serviceInterface } from "../../application/services/s3ServiceInterface";
import { S3ServiceImpl } from "../../frameworks/services/s3Service";
import { MailService } from "../../frameworks/services/mailService";
import { MailServiceInterface } from "../../application/services/mailServiceInterface";
import { GoogleAuthServiceInterface } from "../../application/services/googleAuthServiceInterface";
import { GoogleAuthService } from "../../frameworks/services/googleAuthService";

const authController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB,
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  s3ServiceInterface: S3serviceInterface,
  s3ServiceImpl: S3ServiceImpl,
  mailServiceImpl: MailService,
  mailServiceInterface: MailServiceInterface,
  googleAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthServiceImpl: GoogleAuthService
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const s3Service = s3ServiceInterface(s3ServiceImpl());
  const mailServices = mailServiceInterface(mailServiceImpl());
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());

  const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await adminLogin(
      email,
      password,
      dbRepositoryAdmin,
      authService
    );
    res.json({
      status: "success",
      message: "admin verified",
      token,
    });
  });

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: {
      userName: string;
      email: string;
      phone: number;
      password: string;
    } = req.body;
    await userRegister(user, dbRepositoryUser, authService, mailServices);
    res.json({
      status: "success",
      message: "new user registered",
    });
  });

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const userDetails = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService,
      s3Service
    );
    res.json({
      status: "success",
      message: "user verified",
      userDetails,
    });
  });

  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    const { token }: { token: string } = req.body;
    const userDetails = await signInWithGoogle(
      token,
      googleAuthService,
      dbRepositoryUser,
      authService,
      s3Service
    );
    res.json({
      status: "success",
      message: "user verified",
      userDetails,
    });
  });

  const verifiedEmail = asyncHandler(async (req: Request, res: Response) => {
    const { userId, token }: { userId: string; token: string } = req.body;
    await emailVerification(userId, token, dbRepositoryUser, authService);
    res.json({ status: "success", message: "user verified" });
  });

  const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body.values;
    await forgottenPassword(email, dbRepositoryUser, authService, mailServices);
    res.json({ status: "success", message: "Please check email to verify" });
  });

  const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { id, token } = req.params;
    const { pass } = req.body;
    await changePassword(id, token, pass, dbRepositoryUser, authService);
    res.json({ status: "success", message: "password changed" });
  });

  const otpLogin = asyncHandler(async (req: Request, res: Response) => {
    const { accessToken }: { accessToken: string } = req.body;
    const userDetails = await loginWithOtp(
      accessToken,
      dbRepositoryUser,
      authService,
      s3Service
    );
    res.json({
      status: "success",
      message: "user verified",
      userDetails,
    });
  });

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

export default authController;
