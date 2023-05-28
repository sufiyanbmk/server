import Catagory from "../models/catagoryModel";
import { CreateCatagoryInterface } from "../../../../types/catagoryInterface";

export const catagoryRepositoryMongoDb = () => {
  const getAllCatagory = async () =>
    await Catagory.find()

  const findCatagory = async ( catagory: string ) => 
    await Catagory.findOne({ title: catagory })
  
  const addNewCatagory = async ( catagory: CreateCatagoryInterface ) =>
    await Catagory.create(catagory);

  const deleteOneCatagory = async (catagoryId:string) => 
    await Catagory.deleteOne({_id:catagoryId})

    return{
      getAllCatagory,
      findCatagory,
      addNewCatagory,
      deleteOneCatagory
    }

}

export type CatagoryRepositoryMongoDb = typeof catagoryRepositoryMongoDb;