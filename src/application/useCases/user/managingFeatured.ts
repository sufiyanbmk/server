import { StripeServiceInterface } from "../../services/stripeServiceInterface";
import { ProductDbInterface } from "../../repositories/productDbRepository";
import { S3serviceInterface } from "../../services/s3ServiceInterface";
import { addSignedUrl } from "./managingUrl";

export const createPayment = async(
    stripeServices:ReturnType<StripeServiceInterface>
) => await stripeServices.add(1999)

export const abadonPayment =async(
    paymentId:string,
    stripeServices:ReturnType<StripeServiceInterface>
) => await stripeServices.callOff(paymentId)

export const addPlansFeatures = async(
    proID:string,
    plan:number,
    price:number,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
) => {
    const currentDate = new Date()
    const expireDate = new Date(currentDate.setMonth(currentDate.getMonth() + plan));
    await dbRepositoryProduct.editProduct({proID},{ $push: { featured: { plan, price, expireDate } } })
} 

export const getAllFeaturedProduct = async(
    limit:number,
    dbRepositoryProduct: ReturnType<ProductDbInterface>,
    s3Services: ReturnType<S3serviceInterface>
) => {
    const products:any = await dbRepositoryProduct.findByField({ featured:{ $exists: true, $ne: [] } },limit)
    const productsWithUrl = await addSignedUrl(products,s3Services)
    return productsWithUrl
}