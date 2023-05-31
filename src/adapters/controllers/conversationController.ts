import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepository";
import { ZegoCloudServicesInterface } from "../../application/services/zegoService";
import { GenerateToken04Impl } from "../../frameworks/services/zegoCloudServices";
import { findUser, createAudioCall, generateToken } from "../../application/useCases/user/managingConversation";
import { CallDbRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/callRepository";
import { ConversationRepository } from "../../application/repositories/conversationRepository";


const conversationController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl : UserRepositoryMongoDB,
    zegoserviceImpl : GenerateToken04Impl,
    zegoService: ZegoCloudServicesInterface,
    conversationRepositoryImpl:ConversationRepository,
    callDbRepositoryMongoDb:CallDbRepositoryMongoDb,
) => {
    const dbReposoitoryUser =  userDbRepository(userDbRepositoryImpl())
    const dbReposoitroyConversation = conversationRepositoryImpl(callDbRepositoryMongoDb())
    const zegoServices = zegoService(zegoserviceImpl())

    const startAudioCall = asyncHandler(async(req:Request,res:Response) => {
        const {to,from}:{to:string,from:string} = req.body;
        const from_user = await findUser(from,dbReposoitoryUser)
        const to_user = await findUser(to,dbReposoitoryUser)

        const new_audio_call = await createAudioCall(to,from,dbReposoitroyConversation)
        
        res.json({  data: {
            from: to_user,
            roomID: new_audio_call._id,
            streamID: to,
            userID: from,
            userName: from,
          },})
    })

    const generateZegoToken = asyncHandler(async(req:Request,res:Response) => {
        const { userId, room_id }:{userId:string,room_id:string} = req.body;
        const token = await generateToken(userId,room_id,zegoServices)
        res.json({status:"success",token})
    })

    return{
        startAudioCall,
        generateZegoToken
    }

}

export default conversationController;