import { GenerateToken04Impl } from "../../frameworks/services/zegoCloudServices";

export const zegoServiceInterface = (service:ReturnType<GenerateToken04Impl>) => {
    const generate = async(
        appID:number,
        userId:string,
        serverSecret:string,
        effectiveTimeInSeconds:any,
        payload:any
    ) =>{
        const token = await service.generateToken04(appID,userId,serverSecret,effectiveTimeInSeconds,payload)
        return token
    } 


    return{
        generate
    }

}

export type ZegoCloudServicesInterface = typeof zegoServiceInterface;