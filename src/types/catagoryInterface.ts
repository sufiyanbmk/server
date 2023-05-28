import { Types } from "mongoose"

export interface CreateCatagoryInterface {
  title:string,
  description?:string
}

export interface CatagoryInterface {
  _id?:Types.ObjectId,
  title:string,
  description?:string
}
