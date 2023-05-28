import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import {UserInterface, UserReturnInterface, Verificationpayload} from "../../../types/userInterface";
import { S3serviceInterface } from "../../services/s3ServiceInterface";
import { MailServiceInterface } from "../../services/mailServiceInterface"; 
import { GoogleAuthServiceInterface } from "../../services/googleAuthServiceInterface";

export const userRegister = async (
  user: {userName:string,email:string,phone:number,password:string},
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>,
  mailService: ReturnType<MailServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  }
  user.password = await authService.encryptPassword(user.password);
  const { _id: userId } = await userRepository.addUser(user);
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
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>,
  s3Services: ReturnType<S3serviceInterface>
) => {
   const user:UserInterface | null | any = await userRepository.getUserByEmail(email)
   if(!user){
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED)
   }
   if(user.isGoogleUser){
    throw new AppError("You are logged in using Google Auth",401)
   }
   const isPasswordCorrect = await authService.comparePassword(password,user.password)
   if(!isPasswordCorrect){
    throw new AppError("Sorry, your password was incorrect. Please double-check your password", HttpStatus.UNAUTHORIZED)
   }
   const token = authService.generateToken(user._id.toString())
   if(user.profileImage){
    let url = await s3Services.getFile(user.profileImage);
    user.set("imgLink", url, { strict: false });
   }
   const userDetails : UserReturnInterface = {
    id:user._id,
    email:user.email,
    userName:user.userName,
    profileImage:user.profileImage,
    imgLink:user.imgLink,
    token:token
   }

   return userDetails;
};

export const signInWithGoogle=async(
  token:string,
  googleAuthService:ReturnType<GoogleAuthServiceInterface>,
  userRepository: ReturnType<UserDbInterface>, 
  authService: ReturnType<AuthServiceInterface>,
  s3Services: ReturnType<S3serviceInterface>
  )=>{
  const user = await googleAuthService.verify(token)
  const isUserExist : UserInterface | null | any = await userRepository.getUserByEmail(user.email);
  if(isUserExist){
    const token = authService.generateToken(isUserExist._id.toString());
    if(isUserExist.profileImage){
      let url = await s3Services.getFile(isUserExist.profileImage);
      isUserExist.set("imgLink", url, { strict: false });
     }
     const userDetails : UserReturnInterface = {
      id:isUserExist._id,
      email:isUserExist.email,
      userName:isUserExist.userName,
      profileImage:isUserExist.profileImage,
      imgLink:isUserExist.imgLink,
      token:token
     }
    return userDetails;
  }else{
    const data = await userRepository.addUser(user);
    const token = authService.generateToken(data._id.toString());
    const userDetails : UserReturnInterface = {
      id:data._id,
      email:data.email,
      userName:data.userName,
      profileImage:data.profileImage,
      token:token
    }
    return userDetails;
  }
}

export const emailVerification = async(
  userId :string,
  token:string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>,
) => {
  const user = await userRepository.getById(userId)
  if(!user)
   throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED)
  try{
    const payload: any = authService.verifyPassword(token)
   }catch(err){
     throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)
   }
   await userRepository.updateDb({_id:user._id},{isverified:true})
}

export const forgottenPassword = async(
  email:string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>,
  mailService: ReturnType<MailServiceInterface>
) => {
  const user:UserInterface | null | any = await userRepository.getUserByEmail(email)
  if(!user)
   throw new AppError("this email doesn't exist", HttpStatus.UNAUTHORIZED)
  const token = authService.generateToken(user._id.toString());
  const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
  const mailOpt = {
    from: "RENT <RENT@gmail.com>",
    to: "sufiyanbmk01@gmail.com",
    subject: "VERIFY EMAIL",
    text: `Your Verify Email Link is:${link}`,
    html: `<hi>Your Verify Email Link is:${link}</h1>`,
  };
  mailService.sendMail(mailOpt);
}

export const changePassword = async(
  id: string,
  token: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await userRepository.getById(id)
  if(!user)
   throw new AppError("this email doesn't exist", HttpStatus.UNAUTHORIZED)
  try{
    const payload: any = authService.verifyPassword(token)
   }catch(err){
     throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)
   }
   const hashedPassword = await authService.encryptPassword(password)
   await userRepository.updateDb({_id:user._id},{password: hashedPassword})
}

export const loginWithOtp = async(
  accessToken:string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const decoded : any = authService.decode(accessToken)
  const sanitizedPhoneNumber = decoded.phone_number.replace('+91', '');
  console.log(sanitizedPhoneNumber)
  const user : UserInterface | null | any = await userRepository.getByField({phone:sanitizedPhoneNumber})
  if(!user)
   throw new AppError("this email doesn't exist", HttpStatus.UNAUTHORIZED)
  return user;
}