import express from "express";
import adminController from "../../../adapters/controllers/adminController";
import { adminDbRepository } from "../../../application/repositories/adminDbRepsitory";
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepository";
import { productDbRepository } from "../../../application/repositories/productDbRepository";
import { productRepositoryMongoDB } from "../../database/mongoDb/repositories/productRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { catagoryRepository } from "../../../application/repositories/catagoryDbRepository";
import { catagoryRepositoryMongoDb } from "../../database/mongoDb/repositories/catagoryRepository";

const adminRouter = () => {
  const router = express.Router();

  const controller = adminController(
    adminDbRepository,
    adminRepositoryMongoDB,
    productDbRepository,
    productRepositoryMongoDB,
    userDbRepository,
    userRepositoryMongoDB,
    catagoryRepository,
    catagoryRepositoryMongoDb
  );

  router
    .route("/users")
    .get(controller.getAllUsers)
    .put(controller.blockUser);

  router
    .route("/catagory")
    .get(controller.getAllCatagory)
    .post(controller.addCatagory);

  router.delete("/catagory/:catagoryId", controller.deleteCatagory);

  router.get("/products", controller.getAllProducts);

  router
    .route("/product/:proId")
    .get(controller.getSingleProduct)
    .delete(controller.deleteProduct);

  router.get("/reported-product", controller.reportedProduct);

  router.get("/dashboard-data", controller.getDashboardData);

  router.get("/product-graph", controller.getProductGraph);

  router.get("/user-graph", controller.getUserGraph);

  router.get("/pie-chart", controller.pieChartProduct);

  return router;
};
export default adminRouter;
