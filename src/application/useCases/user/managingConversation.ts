import { UserDbInterface } from "../../repositories/userDbRepository";
import { ConversationRepository } from "../../repositories/conversationRepository";
import { ZegoCloudServicesInterface } from "../../services/zegoService";
import configKeys from "../../../config";

export const findUser = async(
    id:string,
    dbRepositoryUser: ReturnType<UserDbInterface>,

) => await dbRepositoryUser.getById(id)

export const createAudioCall = async(
    to:string,
    from:string,
    dbReposoitroyConversation: ReturnType<ConversationRepository>
) => {
    const status = "Ongoing"
    const participants = [from,to]
   const new_audio_call = await dbReposoitroyConversation.newOne(participants, to,from,status)
   return new_audio_call;
}

export const generateToken = async(
    userId:string,
    room_id:string,
    zegoCloud:ReturnType<ZegoCloudServicesInterface>
) => {
    const appId:any = configKeys.ZEGO_APP_ID
    const serverSecret = configKeys.ZEGO_SERVER_SECRET
    const effectiveTimeInSeconds = 3600;
    const payloadObject = {
        room_id, 
        privilege: {
          1: 1,
          2: 1, 
        },
        stream_id_list: null,
      }; 
      const appID = appId * 1;
      const payload = JSON.stringify(payloadObject);
    const token = await zegoCloud.generate(appID,userId,serverSecret,effectiveTimeInSeconds,payload)
}