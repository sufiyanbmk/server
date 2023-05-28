import express from 'express'
import { featuredController } from '../../../adapters/controllers/featuredController'
import { productDbRepository } from "../../../application/repositories/productDbRepository";
import { productRepositoryMongoDB } from "../../database/mongoDb/repositories/productRepository";
import { stripeService } from '../../services/stripeService'
import { stripeServiceInterface } from '../../../application/services/stripeServiceInterface'
import { s3Service } from "../../services/s3Service";
import { s3ServiceInterface } from "../../../application/services/s3ServiceInterface";

const featuredRouter = () => {
    const router = express.Router()

    const controller = featuredController(
        productDbRepository,
        productRepositoryMongoDB,
        stripeService,
        stripeServiceInterface,
        s3Service,
        s3ServiceInterface
    )

    router.get('/config' ,controller.getPublishKey)

    router.post('/create-payment-intent',controller.stripePayment)

    router.post('/cancel-payment', controller.cancelPayment)

    router.patch('/update-feature',  controller.updateToFeature)

    router.get('/home-product', controller.getFeaturedOnlyProduct)


    return router

}

export default featuredRouter;