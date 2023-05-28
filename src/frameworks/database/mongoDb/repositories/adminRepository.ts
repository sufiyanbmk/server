import AdminInterface from "../../../../types/adminInterface"
import Admin from "../models/adminModel"
import User from "../models/userModel";


export const adminRepositoryMongoDB = () => {
  const getAdminByEmail = async(email:string) => {
    const admin:AdminInterface | null = await Admin.findOne({email})
    return admin
  }
  return {
    getAdminByEmail,

  }
}

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;

export type AdminRepositoryDbReturnMongoDB = ReturnType<AdminRepositoryMongoDB>