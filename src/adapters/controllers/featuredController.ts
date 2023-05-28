import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import configKeys from '../../config'
import { ProductDbInterface } from "../../application/repositories/productDbRepository";
import { ProductRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/productRepository";
import { StripeServiceImpl } from '../../frameworks/services/stripeService'
import { StripeServiceInterface } from '../../application/services/stripeServiceInterface'
import { S3ServiceImpl, } from "../../frameworks/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3ServiceInterface";
import { createPayment, abadonPayment, addPlansFeatures, getAllFeaturedProduct } from '../../application/useCases/user/managingFeatured'

export const featuredController = (
    productDbRepository: ProductDbInterface,
    productRepositoryImpl: ProductRepositoryMongoDB,
    stripeServicImpl:StripeServiceImpl,
    stripeServiceInterface:StripeServiceInterface,
    s3ServiceImpl: S3ServiceImpl,
    s3Service: S3serviceInterface
) => {
    const DbRepositoryProduct = productDbRepository(productRepositoryImpl())
    const stripeServices = stripeServiceInterface(stripeServicImpl())
    const s3Services = s3Service(s3ServiceImpl());

    const getPublishKey = asyncHandler(async(req:Request,res:Response) => {
        res.send({publishableKey:configKeys.STRIPE_PUBLISHABLE_KEY})
    })  

    const stripePayment = asyncHandler(async(req:Request,res:Response) =>{
        const paymentIntent :any = await createPayment(stripeServices)
        res.json({status:'success',message:"payment dond",
        clientSecret: paymentIntent.client_secret,paymentId:paymentIntent.id
      })
    })

    const cancelPayment = asyncHandler(async(req:Request,res:Response) => {
        const {paymentId}:{paymentId:string} = req.body
        await abadonPayment(paymentId,stripeServices)
        res.json({status:'success',message:'payment cancelled'})
    })

    const updateToFeature = asyncHandler(async(req:Request,res:Response) => {
        const { proID,plan,price }:{proID:string,plan:number,price:number} = req.body
        await addPlansFeatures(proID,plan,price,DbRepositoryProduct)
        res.json({status:'success',message:"updated"})
    })

    const getFeaturedOnlyProduct = asyncHandler(async(req:Request,res:Response) => {
        const product = await getAllFeaturedProduct(DbRepositoryProduct,s3Services)
        res.json(product)
    })


    return{
        getPublishKey,
        stripePayment,
        cancelPayment,
        updateToFeature,
        getFeaturedOnlyProduct
    }
}