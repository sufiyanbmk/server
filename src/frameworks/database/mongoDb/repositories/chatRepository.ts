import Chat from "../models/chatModel";

export const chatDbRepositoryMongoDb = () => {
  const findByField = async (critriya: object) =>
    await Chat.find(critriya).populate({
      path: "participants",
      select: "userName profileImage _id email status",
    });

  const create = async (to:string,from:string) => await Chat.create({participants: [to, from]})

  const findById = async(newChat:any) => await Chat.findById(newChat).populate( "participants",  "userName _id email status" );

  const getMessagesById = async(id:string) => await Chat.findById(id).select("messages")

  const getById = async(id:string) => await Chat.findById(id)

  return {
    findByField,
    create,
    findById,
    getMessagesById,
    getById
  };
};

export type ChatDbRepositoryMongoDb = typeof chatDbRepositoryMongoDb;
