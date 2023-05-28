import { ObjectId } from "mongoose";

export interface UserInterface {
  set(arg0: string, url: string, arg2: { strict: boolean; }): unknown;
  _id: string | ObjectId;
  userName:string;
  email: string;
  password: string;
  profileImage:string;
  imgLink?:string;
  isGoogleUser:boolean;
  token?:string;
  socket_id?:string;
}

export interface UserReturnInterface { 
  id:ObjectId | string | any,
  userName:string,
  email:string,
  profileImage?:string,
  imgLink?:string,
  token?:string,
  socket_id?:string;
}

export interface CreateUserInterface{
  userName:string;
  email: string;
  password?: string;
  isGoogleUser?:boolean
}

export interface Verificationpayload {
  email: string;
  _id: any;
}