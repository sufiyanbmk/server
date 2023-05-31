import { userRepositoryMongoDB } from "../database/mongoDb/repositories/userRepository"
import { callDbRepositoryMongoDb } from "../database/mongoDb/repositories/callRepository"

export const callNOtPicked = async(data:any) => {
    const { to, from } : {to:string,from:string} =data
    const to_user = await userRepositoryMongoDB().getById(to)
    const firstParmeter =  {
        participants: { $size: 2, $all: [to, from] },
      }
    const secondParameter =  { verdict: "Missed", status: "Ended", endedAt: Date.now() }
    await callDbRepositoryMongoDb().findOneAndUpdate(firstParmeter,secondParameter)
    return to_user
}

export const startAudioCall = async(data:any) => {
    const { from, to } = data;
    const to_user = await userRepositoryMongoDB().getById(to);
    const from_user = await userRepositoryMongoDB().getById(from);
    return ({to_user,from_user})
}

export const callAccepted = async(data:any) => {
    const { to, from } = data;
    const from_user = await userRepositoryMongoDB().getById(from);
    const firstParmeter =  {
        participants: { $size: 2, $all: [to, from] },
      }
      const secondParameter =  { verdict: "Accepted"}
      await callDbRepositoryMongoDb().findOneAndUpdate(firstParmeter,secondParameter)
    return from_user
}

export const callDenied = async(data:any) => {
    const { to, from } = data;
    const firstParmeter =  {
        participants: { $size: 2, $all: [to, from] },
      }
    const secondParameter = { verdict: "Denied", status: "Ended", endedAt: Date.now() }
    await callDbRepositoryMongoDb().findOneAndUpdate(firstParmeter,secondParameter)
    const from_user = await userRepositoryMongoDB().getById(from);
    return from_user
}

export const userIsBusy = async(data:any)=> {
    const { to, from } = data;
    const firstParmeter =  {
        participants: { $size: 2, $all: [to, from] },
      }
      const secondParameter =  { verdict: "Busy", status: "Ended", endedAt: Date.now() }
      await callDbRepositoryMongoDb().findOneAndUpdate(firstParmeter,secondParameter)
      const from_user = await userRepositoryMongoDB().getById(from);
      return from_user;
}