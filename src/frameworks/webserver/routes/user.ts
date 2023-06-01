import express from "express";
import upload from "../middlewares/multer";
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { s3Service } from "../../services/s3Service";
import { s3ServiceInterface } from "../../../application/services/s3ServiceInterface";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";

const userRouter = () => {
  const router = express.Router();

  const controller = userController(
    userDbRepository,
    userRepositoryMongoDB,
    s3Service,
    s3ServiceInterface,
  );

  router.route('/profile/:userId')
  .put(upload.single('image'), controller.profileImg)
  .patch(controller.editProfile)
  
  return router;
}

export default userRouter;