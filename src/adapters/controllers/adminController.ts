import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getUsers, blockAndUnblockUser } from '../../application/useCases/admin/managingUser';
import { getCatagories, catagoryAdd, catagoryDelete } from '../../application/useCases/admin/managingCatagory'
import { getProducts, getProduct, removeProduct, reportedProducts } from "../../application/useCases/admin/managingProducts";
import { DashboardData, ProductGraph, userGraph, pieChart } from '../../application/useCases/admin/managingDashboard'
import { AdminDbInterface } from "../../application/repositories/adminDbRepsitory";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/adminRepository";
import { CreateCatagoryInterface } from "../../types/catagoryInterface";
import { ProductDbInterface } from "../../application/repositories/productDbRepository";
import { ProductRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/productRepository";
import { UserDbInterface } from '../../application/repositories/userDbRepository'
import { UserRepositoryMongoDB } from '../../frameworks/database/mongoDb/repositories/userRepository'
import { CatagoryDbInterface } from "../../application/repositories/catagoryDbRepository";
import { CatagoryRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/catagoryRepository";

const adminController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB,
  productDbRepository: ProductDbInterface,
  productRepositoryImpl: ProductRepositoryMongoDB,
  userDbRepository:UserDbInterface,
  userDbRepositoryImpl:UserRepositoryMongoDB,
  catagoryDbRepository:CatagoryDbInterface,
  catagoryDbRepositoryImpl:CatagoryRepositoryMongoDb
) =>{

  const DbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl())
  const DbRepositoryProduct = productDbRepository(productRepositoryImpl())
  const DbRepositoryUser = userDbRepository(userDbRepositoryImpl())
  const DbRepositoryCatagory = catagoryDbRepository(catagoryDbRepositoryImpl())

   const getAllUsers = asyncHandler(async(req: Request, res: Response) => {
    const users = await getUsers(DbRepositoryUser)
    res.json(users) 
   })

   const blockUser = asyncHandler(async(req:Request, res:Response) =>{
    const { email } = req.body;
    await blockAndUnblockUser(email,DbRepositoryUser)
    res.json({status:"success",message:"succefully updated"})
   })

   const getAllCatagory = asyncHandler(async(req:Request, res:Response) => {
    const catagory = await getCatagories(DbRepositoryCatagory)
    res.json(catagory)
   })

   const addCatagory = asyncHandler(async(req:Request, res:Response) => {
    const catagory: CreateCatagoryInterface = req.body
    await catagoryAdd(catagory,DbRepositoryCatagory)
    res.json({status:"success", message:"succefully added"})
   })

   const deleteCatagory = asyncHandler(async(req:Request, res:Response) => {
    const {catagoryId} = req.params
    await catagoryDelete(catagoryId,DbRepositoryCatagory)
    res.json({status:"success",message:"succesfully Deleted"})
   })

   const getAllProducts = asyncHandler(async (req:Request, res:Response) => {
    const products = await getProducts(DbRepositoryProduct)
    res.json(products)
   })

   const getSingleProduct = asyncHandler(async(req:Request, res:Response) => {
    const {proId} = req.params
    const product = await getProduct(proId,DbRepositoryProduct)
    res.json(product)
   })

   const deleteProduct = asyncHandler(async(req:Request,res:Response) => {
    const {proId} = req.params
     await removeProduct(proId,DbRepositoryProduct)
     res.json({status:"success",message:"Deleted successfuly"})
   })

   const reportedProduct = asyncHandler(async(req:Request,res:Response) => {
    const getReportedProduct = await reportedProducts(DbRepositoryProduct)
    res.json(getReportedProduct)
   })

   const getDashboardData = asyncHandler(async(req:Request,res:Response) => {
    const getData = await DashboardData(DbRepositoryUser,DbRepositoryProduct)
    res.json(getData)
   })

   const getProductGraph = asyncHandler(async(req:Request, res:Response) => {
    const getData = await ProductGraph(DbRepositoryProduct)
    res.json(getData)
   })

   const getUserGraph = asyncHandler(async(req:Request, res:Response) => {
    const getData = await userGraph(DbRepositoryUser)
    res.json(getData)
   })

   const pieChartProduct = asyncHandler(async(req:Request, res:Response) => {
    const getData = await pieChart(DbRepositoryProduct)
    res.json(getData)
   })

   return {
    getAllUsers,
    blockUser,
    getAllCatagory,
    addCatagory,
    deleteCatagory,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    reportedProduct,
    getDashboardData,
    getProductGraph,
    getUserGraph,
    pieChartProduct
   }
}

export default adminController;