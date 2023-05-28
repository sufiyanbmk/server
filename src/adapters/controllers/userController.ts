import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { S3ServiceImpl, } from "../../frameworks/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3ServiceInterface";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepository";
import { uploadNewProfileImg, profileEdit } from "../../application/useCases/user/managingProfile";

export const userController = (
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl : UserRepositoryMongoDB,
  s3ServiceImpl: S3ServiceImpl,
  s3Service: S3serviceInterface

) => {
  const dbReposoitoryUser =  userDbRepository(userDbRepositoryImpl())
  const s3Services = s3Service(s3ServiceImpl());

  const profileImg = asyncHandler(async(req:Request, res:Response) => {
    const {userId} = req.params
    const file: Express.Multer.File[] = req.file ? [req.file] : [];
    const updatedImg = await uploadNewProfileImg(userId,file,dbReposoitoryUser, s3Services)
    res.json({status:"success",message:"updated",data : updatedImg})
  })

  const editProfile = asyncHandler(async(req:Request, res:Response )=> {
    const {userId} = req.params
    const updatedField = req.body;
    await profileEdit(userId,updatedField,dbReposoitoryUser)
    res.json({status:"success",message:"edited successfuly"})
  })

  return {
    profileImg,
    editProfile
  }
}

export default userController;