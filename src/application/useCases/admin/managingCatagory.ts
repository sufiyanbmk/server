import { CatagoryDbInterface } from "../../repositories/catagoryDbRepository";
import { CreateCatagoryInterface, CatagoryInterface} from "../../../types/catagoryInterface";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
// import Catagory from "../../../frameworks/database/mongoDb/models/catagoryModel";

export const getCatagories = async (
  dbRepositoryCategory: ReturnType<CatagoryDbInterface>
) => await dbRepositoryCategory.getAllCatagory();

export const catagoryAdd = async(
  catagory: CreateCatagoryInterface,
  dbRepositoryCatagory: ReturnType<CatagoryDbInterface>
) => {
  const findCatagory:CatagoryInterface | null = await  dbRepositoryCatagory.findCatagory(catagory.title)
  if(findCatagory){
    throw new AppError('already Exist', HttpStatus.CONFLICT)
  }
  await dbRepositoryCatagory.addNewCatagory(catagory)
}

export const catagoryDelete = async (
  catagoryId:string,
  dbRepositoryCatagory: ReturnType<CatagoryDbInterface>
) => await dbRepositoryCatagory.deleteOneCatagory(catagoryId)