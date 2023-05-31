import Call from "../models/callModel";

export const callDbRepositoryMongoDb = () =>{
    const create = async(data:object) => await Call.create(data)

    const findOneAndUpdate = async(firstParameter:object,secondParameter:object) => await Call.findOneAndUpdate(firstParameter,secondParameter)

    return{
        create,
        findOneAndUpdate,

    }
}

export type CallDbRepositoryMongoDb = typeof callDbRepositoryMongoDb;