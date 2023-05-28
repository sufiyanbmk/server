import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { ProductDbInterface } from "../../repositories/productDbRepository";
import { S3serviceInterface } from "../../services/s3ServiceInterface";
import { getProductInterface ,ProductDataInterface } from "../../../types/productInterface";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { addSignedUrl } from "./managingUrl";
import { ReportInterface, ReviewInterface } from "../../../types/feedBackInterface";

export const productAdd = async(
    data:ProductDataInterface,
    userId:string,
    files:Express.Multer.File[] | undefined,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) => {
    data.userId = userId
    if(files){
        data.image = await Promise.all(
            files.map(async(files)=>
                await s3Services.upload(files) 
            )
        )
    }
    await dbRepositoryProduct.addProduct(data)
}

export const getAllRentedProduct = async(
    id:string,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) => {
    const products:any = await dbRepositoryProduct.findByField({id})
    const productsWithUrl = await addSignedUrl(products,s3Services)
    return productsWithUrl
}

export const removeProduct = async(
    id:string,
    dbRepositoryProduct:ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) =>{
    const deletedProduct = await dbRepositoryProduct.deleteOneProduct(id)
    deletedProduct?.image.map((imageName) =>{
        s3Services.removeFile(imageName)
    })
} 

export const updateProduct = async(
    id:string,
    data:ProductDataInterface,
    files:Express.Multer.File[] | undefined,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
)=> {
    if(files){
        data.image = await Promise.all(
            files.map(async(files)=>
                await s3Services.upload(files) 
            )
        )
    }
    await dbRepositoryProduct.editProduct({id},data)
}

export const getOneProduct = async(
    id:string,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    dbRepositoryUser: ReturnType<UserDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) => {
    const product : any = await dbRepositoryProduct.getOneProduct(id)
    const productUserDetail : any = await dbRepositoryUser.getById(product.userId)
    const userImgUrl = await s3Services.getFile(productUserDetail?.profileImage)
    const fileUrls = await Promise.all(product.image.map((file: string) => s3Services.getFile(file)));
    product.set("link", fileUrls, { strict: false });
    productUserDetail.set("image", userImgUrl, { strict: false });
    product.set("user", productUserDetail, { strict: false });
    return product;
}

export const searchedProduct = async(
    state:string,
    catagory:string,
    page:number,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) => {
    const searchCretiriya = { state,catagory }
    const products:any = await dbRepositoryProduct.getFilteredProduct(searchCretiriya,page)
    const productsWithUrl = await addSignedUrl(products,s3Services)
    return productsWithUrl
}

export const filterProduct = async(
    searchCretiriya:object,
    page:any,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) => {
    const products:any = await dbRepositoryProduct.getFilteredProduct(searchCretiriya,page)
    // console.log(products,'products')
    const productsWithUrl = await addSignedUrl(products,s3Services)
    return productsWithUrl
}

export const addReview = async(
    data:ReviewInterface,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
) => {
    const {userId,productId}:{userId:string,productId:string} = data
    const existUser = await dbRepositoryProduct.checkReview(productId,userId)
    if(existUser.length > 0)
     throw new AppError("this review is already exist", HttpStatus.CONFLICT)
    const newReview = await dbRepositoryProduct.addNewReview(data)
    await dbRepositoryProduct.updateById(productId,{ $push:{reviews:newReview._id} })
}

export const addReport = async(
    data:ReportInterface,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
) => {
    const {userId,productId}:{userId:string,productId:string} = data
    const existUser = await dbRepositoryProduct.checkReport(productId,userId)
    if(existUser.length > 10)
     throw new AppError("this review is already exist", HttpStatus.CONFLICT)
    const newReport = await dbRepositoryProduct.addNewReport(data)
    await dbRepositoryProduct.updateById(productId,{$push:{reports:newReport._id}})
}