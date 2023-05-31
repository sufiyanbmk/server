import express from "express";
import authController from "../../../adapters/controllers/authController";
import { adminDbRepository } from "../../../application/repositories/adminDbRepsitory";
import { authService } from "../../services/authService";
import {authServiceInterface} from "../../../application/services/authServiceInterface";
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import {  s3ServiceInterface } from "../../../application/services/s3ServiceInterface";
import { s3Service } from "../../services/s3Service";
import { mailService } from "../../services/mailService";
import { mailServiceInterface } from "../../../application/services/mailServiceInterface";
import { googleAuthService } from "../../services/googleAuthService";
import { googleAuthServiceInterface } from "../../../application/services/googleAuthServiceInterface";


const authRouter = () => {
  const router = express.Router();

  const controller = authController(
    adminDbRepository ,
    adminRepositoryMongoDB,
    authServiceInterface ,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
    s3ServiceInterface,
    s3Service,
    mailService,
    mailServiceInterface,
    googleAuthServiceInterface,
    googleAuthService
    );

  router.post('/admin-login', controller.loginAdmin)

  router.post('/register',controller.registerUser)

  router.post('/user-login', controller.loginUser)

  router.post('/sign-in-with-google', controller.loginWithGoogle)

  router.post('/forgot-password', controller.forgotPassword);

  router.put("/reset-password/:id/:token", controller.resetPassword);

  router.put('/email-verified',controller.verifiedEmail)

  router.post('/otp-login', controller.otpLogin)
  
  return router
}

export default authRouter;