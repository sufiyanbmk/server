import express from "express";
import conversationController from '../../../adapters/controllers/conversationController'
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { zegoTokenGenerator } from "../../services/zegoCloudServices";
import { zegoServiceInterface } from "../../../application/services/zegoService";
import { conversationRepository } from "../../../application/repositories/conversationRepository";
import { callDbRepositoryMongoDb } from "../../database/mongoDb/repositories/callRepository";

const conversationRouter = () => {

    const router = express.Router();
    const controller = conversationController(
        userDbRepository,
        userRepositoryMongoDB,
        zegoTokenGenerator,
        zegoServiceInterface,
        conversationRepository,
        callDbRepositoryMongoDb,
    )

    //call
    router.post("/start-call",controller.startAudioCall)

    
    router.post(
    "/generate-zego-token",
    controller.generateZegoToken
  );

    return router;

}

export default conversationRouter;