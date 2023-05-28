import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductDataInterface } from "../../types/productInterface";
import { S3ServiceImpl, } from "../../frameworks/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3ServiceInterface";
import { ProductDbInterface } from "../../application/repositories/productDbRepository";
import { ProductRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/productRepository";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepository";
import { ReviewInterface, ReportInterface} from "../../types/feedBackInterface";
import { productAdd, getAllRentedProduct,removeProduct, updateProduct, getOneProduct, searchedProduct,filterProduct, addReview, addReport } from "../../application/useCases/user/managingProduct";

const productController = (
    productDbRepository: ProductDbInterface,
    productRepositoryImpl: ProductRepositoryMongoDB,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl : UserRepositoryMongoDB,
    s3ServiceImpl: S3ServiceImpl,
    s3Service: S3serviceInterface

) => {
    const DbRepositoryProduct = productDbRepository(productRepositoryImpl())
    const dbReposoitoryUser =  userDbRepository(userDbRepositoryImpl())
    const s3Services = s3Service(s3ServiceImpl());

    const addProduct = asyncHandler(async(req:Request,res:Response) => {
        const data : ProductDataInterface = JSON.parse(req.body.data) 
        const {userId} :{userId:string} = req.body
        const files = req.files as Express.Multer.File[];
        await productAdd(data, userId, files, DbRepositoryProduct, s3Services)
        res.json({status:"success",message:"product added"})
    })

    const getRendedProduct = asyncHandler(async(req:Request,res:Response) => {
        const {id} = req.params
        const rentedProducts = await getAllRentedProduct(id,DbRepositoryProduct,s3Services)
        res.json(rentedProducts)
    })

    const deleteProduct = asyncHandler(async(req:Request,res:Response) => {
        const {id} = req.params
        await removeProduct(id,DbRepositoryProduct,s3Services)
        res.json({status:"success",message:"deleted succesfully"})
    }) 

    const editproduct = asyncHandler(async(req:Request,res:Response) => {
        const {id} = req.params
        const data : any = JSON.parse(req.body.data) 
        const files = req.files as Express.Multer.File[];
        await updateProduct(id,data,files,DbRepositoryProduct,s3Services)
        res.json({status:"success",message:"updated successfully"})
    })

    const getSingleProduct = asyncHandler(async(req:Request,res:Response) => {
        const {id} = req.params
        const singleproduct = await getOneProduct(id,DbRepositoryProduct,dbReposoitoryUser,s3Services)
        res.json(singleproduct)
    })

    const getSearchedProduct = asyncHandler(async(req:Request, res:Response) => {
        const {state,catagory,page}:{state:string,catagory:string,page:number} = req.body
        const data = await searchedProduct(state,catagory,page,DbRepositoryProduct,s3Services)
        res.json(data)
    })

    const getProductsByName = asyncHandler(async(req:Request,res:Response) => {
        const {state,catagory,name,page } = req.query 
        const searchCriteria = {productName:{ $regex: `^${name}`, $options: 'i' }, state:state,catagory:catagory }
        const data = await filterProduct(searchCriteria,page,DbRepositoryProduct,s3Services)
        // console.log(data,'data')
        res.json(data)
    })

    const getProductsByCity = asyncHandler(async(req:Request,res:Response) => {
        const {state,catagory,city,page} = req.query
        const searchCriteria = {city:{ $regex: `^${city}`, $options: 'i' }, state:state,catagory:catagory}
        console.log(searchCriteria)
        const data = await filterProduct(searchCriteria,page,DbRepositoryProduct,s3Services)
        res.json(data)
    })

    const getProductByPrice = asyncHandler(async(req:Request,res:Response) => {
        const {state,catagory,min,max,page} = req.query
        const searchCriteria = {
            price: { $gte: min, $lte: max },state:state,catagory:catagory};
        const data = await filterProduct(searchCriteria,page,DbRepositoryProduct,s3Services)
        res.json(data)
    })

    const createReview = asyncHandler(async(req:Request,res:Response) => {
        const data :ReviewInterface = req.body
        await addReview(data,DbRepositoryProduct)
        res.json({status:"success",message:"added successfully"})
    })

    const createReport = asyncHandler(async(req:Request,res:Response)=>{
        const data : ReportInterface = req.body
        await addReport(data,DbRepositoryProduct)
        res.json({status:"success",message:"added successfully"})
    })


    return{
        addProduct,
        getRendedProduct,
        deleteProduct,
        editproduct,
        getSingleProduct,
        getSearchedProduct,
        getProductsByName,
        getProductsByCity,
        getProductByPrice,
        createReview,
        createReport
    }
}

export default productController;