import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { S3serviceInterface } from "../../services/s3ServiceInterface";

export const uploadNewProfileImg = async(
  userId:string,
  file : Express.Multer.File[] | undefined,
  dbRepositoryUser: ReturnType<UserDbInterface>,
  s3Service:ReturnType<S3serviceInterface>
) => {
  if(!file)
    throw new AppError("there is no image",HttpStatus.NOT_ACCEPTABLE)
  const profileImg = await s3Service.upload(file[0])
  const oldProfileImg = await dbRepositoryUser.updateImg(userId,profileImg)
  if(oldProfileImg?.profileImage !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"){
    await s3Service.removeFile(oldProfileImg?.profileImage as string)
  }
  const newProfileImg = await s3Service.getFile(profileImg)
  return newProfileImg
}

export const profileEdit = async(
  userId : string,
  updatedField:object,
  dbRepositoryUser:ReturnType<UserDbInterface>
) => 
  await dbRepositoryUser.updateDb({userId},updatedField)
