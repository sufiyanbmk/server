import express from "express";
import upload from "../middlewares/multer";
import productController from "../../../adapters/controllers/productController";
import { productDbRepository } from "../../../application/repositories/productDbRepository";
import { productRepositoryMongoDB } from "../../database/mongoDb/repositories/productRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { s3Service } from "../../services/s3Service";
import { s3ServiceInterface } from "../../../application/services/s3ServiceInterface";

const productRouter = () => {
    const router = express.Router();
    const controller = productController(
        productDbRepository,
        productRepositoryMongoDB,
        userDbRepository,
        userRepositoryMongoDB,
        s3Service,
        s3ServiceInterface
    )
    router.post('/add-product', upload.array("file"), controller.addProduct)

    router.route('/rented-products/:id')
    .get(controller.getRendedProduct)
    .delete(controller.deleteProduct)

    router.put('/edit-product/:id',upload.array("file"), controller.editproduct)

    router.get('/product-detail/:id',controller.getSingleProduct)

    router.post('/searched-product', controller.getSearchedProduct)

    router.get('/search-by-name', controller.getProductsByName)

    router.get('/search-by-city', controller.getProductsByCity)

    router.get('/search-by-price', controller.getProductByPrice)
  
    router.post('/review', controller.createReview)

    router.post('/report', controller.createReport )

    return router;
}

export default productRouter;