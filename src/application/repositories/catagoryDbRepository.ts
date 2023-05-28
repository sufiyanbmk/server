import { CatagoryRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/catagoryRepository";
import { CreateCatagoryInterface } from '../../types/catagoryInterface'

export const catagoryRepository = (repository:ReturnType<CatagoryRepositoryMongoDb>) => {

  const getAllCatagory = async() => await repository.getAllCatagory()

  const findCatagory = async ( catagory:string ) => await repository.findCatagory(catagory)

  const addNewCatagory = async ( catagory: CreateCatagoryInterface ) => await repository.addNewCatagory(catagory)

  const deleteOneCatagory = async (catagoryId:string) => await repository.deleteOneCatagory(catagoryId)

  return{
    getAllCatagory,
    findCatagory,
    addNewCatagory,
    deleteOneCatagory
  }
}

export type CatagoryDbInterface = typeof catagoryRepository