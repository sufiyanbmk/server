import { userRepositoryMongoDB } from "../database/mongoDb/repositories/userRepository"
import { chatDbRepositoryMongoDb } from "../database/mongoDb/repositories/chatRepository"
import { s3Service } from "../services/s3Service"

export const changeStatus = async(
    userId:string,
    socket_id:string,
    status:string
) => await userRepositoryMongoDB().findByOneAndUpdate(userId,{socket_id,status})

export const getUsersAleredyChated = async(userId:string) => {
    try{
      const critriya = {participants: { $all: [userId] }}
      const existingConversations = await chatDbRepositoryMongoDb().findByField(critriya)
      const participantsWithImageUrls = await Promise.all(
        existingConversations[0].participants.map(async (x:any) => {
          x.profileImage = await s3Service().getFile(x.profileImage);
          return x;
        })
      );
      return existingConversations
    }catch(err){
        console.log(err)
    }
}

export const checkExistConversation = async(data:any) => {
    const { to, from } : {to:string,from:string} =data
    const critriya = { participants: { $size: 2, $all: [to, from] } }
    try{
        const existingConversations = await chatDbRepositoryMongoDb().findByField(critriya)
        if(existingConversations.length > 0){
          const participantsWithImageUrls = await Promise.all(
              existingConversations[0]?.participants.map(async (x:any) => {
                x.profileImage = await s3Service().getFile(x.profileImage);
                return x;
              })
            );
        }
          return existingConversations
    }catch(err){
        console.log(err)
    }
}

export const createNewChat = async(data:any) => {
    const { to, from } : {to:string,from:string} =data
    try{
        let newChat : any = await chatDbRepositoryMongoDb().create(to,from)
        newChat = await chatDbRepositoryMongoDb().findById(newChat)
        return newChat;
    }catch(err){
        console.log(err)
    }
}

export const getMessages = async(data:any) => await chatDbRepositoryMongoDb().getMessagesById(data.conversation_id)

export const textMessage = async(data:any) => {
    const { message, conversation_id, from, to, type } = data;
    try{    
      console.log(from)
        const toUser = await userRepositoryMongoDB().getById(to)
        const fromUser = await userRepositoryMongoDB().getById(from)
        const new_message = {
            to,
            from,
            type,
            created_at: new Date(),
            text: message,
            toUser,
            fromUser,
            conversation_id
          };
        const chat = await chatDbRepositoryMongoDb().getById(conversation_id)
        chat?.messages.push(new_message)
        if (chat) {
            await chat.save({
              validateModifiedOnly: true
            });
          }
          return new_message;
    }catch(err){
        console.log(err)
    }
}

export const fileMessage = async(data:any) => {
    const { message, conversation_id, from, to, type } = data;
    try{
        const toUser = await userRepositoryMongoDB().getById(to)
        const fromUser = await userRepositoryMongoDB().getById(from)
        const key = await s3Service().uploadFile(message)
        const imgLink = await s3Service().getFile(key)
        const Media = type
        const new_message = {
            to,
            from,
            type: Media,
            created_at:  new Date(),
            text: imgLink,
            toUser,
            fromUser,
            conversation_id
          };
        let chat = await chatDbRepositoryMongoDb().getById(conversation_id)
        chat?.messages.push(new_message)
        if (chat) {
            await chat.save({
              validateModifiedOnly: true
            });
          }
          return new_message;
    }catch(err){
        console.log(err)
    }
}

export const findUser = async(to:any) =>{
    try{
        const toUser = await userRepositoryMongoDB().getById(to)
    }catch(err){
        console.log(err)
    }
}