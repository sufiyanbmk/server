import { ProductDbInterface } from "../../repositories/productDbRepository";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

export const getProducts = async (
  dbRepositoryProduct: ReturnType<ProductDbInterface>
) => await dbRepositoryProduct.getAll();

export const getProduct = async (
  proId: string,
  dbRepositoryProduct: ReturnType<ProductDbInterface>
) => await dbRepositoryProduct.getOneProduct(proId);

export const removeProduct = async(
  proId:string ,
  dbRepositoryProduct: ReturnType<ProductDbInterface>
) => await dbRepositoryProduct.deleteOneProduct(proId)

export const reportedProducts = async(
  dbRepositoryProduct: ReturnType<ProductDbInterface>
) => await dbRepositoryProduct.reprots()