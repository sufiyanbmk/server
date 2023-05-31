import { CallDbRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/callRepository";

export const conversationRepository = (repository:ReturnType<CallDbRepositoryMongoDb>) => {
    const newOne = async(
        participants:string[],
        to:string,
        from:string,
        status:string,

    ) => {
        const data = {
            participants,
            from,
            to,
            status
        }
        const result = await repository.create(data)
        return result     
    }

    return {
        newOne,
    }
}

export type ConversationRepository = typeof conversationRepository;