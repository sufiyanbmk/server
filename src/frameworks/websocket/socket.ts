import { Server } from 'socket.io';
import { AuthService } from '../services/authService';
import { changeStatus, getUsersAleredyChated, checkExistConversation, createNewChat, getMessages, textMessage, fileMessage, findUser} from './mangingChat';
import { s3ServiceInterface } from '../../application/services/s3ServiceInterface';
import { UserInterface } from '../../types/userInterface';

const socketConfig = (io:Server,authServices:ReturnType<AuthService>) => {
        
    io.use((socket,next)=>{
        if(socket.handshake.query && socket.handshake.query.token){
           const res:any = authServices.verifyToken(socket.handshake.query.token as string)
           socket.data.userId=res.payload
           next()
        }
    })
    .on("connection",async(socket) =>{
        console.log('user connected in the socket')
        if(socket.data.userId){
            const status = "Online";
            await changeStatus(socket.data.userId,socket.id,status)
        }   

        socket.on("get_direct_conversations", async (callback:any) => {
            const existing_conversations = await getUsersAleredyChated(socket.data.userId)
                callback(existing_conversations);
          }); 

        socket.on("start_conversation", async (data:any) => {
            const existing_conversations :any = await checkExistConversation(data)
            if (existing_conversations?.length === 0) {
                const new_chat = await createNewChat(data);
                socket.emit("start_chat", new_chat);
              }
              else {
                socket.emit("start_chat", existing_conversations[0]);
              }
        })

        socket.on("get_messages",async(data:any,callback:any) => {
            const messages = await getMessages(data)
            callback(messages)
        })

        socket.on("text_message",async(data:any) =>{
            const newMessage = await textMessage(data)
            // console.log(newMessage)
            const {toUser,fromUser} = newMessage as any
            io.to(toUser?.socket_id).emit("new_message", {
                message: newMessage,
              });
              io.to(fromUser?.socket_id).emit("new_message", {
                message: newMessage,
              });
        })

        socket.on("file_message",async(data:any) => {
            const newMessage = await fileMessage(data)
            const {toUser,fromUser} = newMessage as any
            io.to(toUser?.socket_id).emit("new_message", {
                message: newMessage,
              });
              io.to(fromUser?.socket_id).emit("new_message", {
                message: newMessage,
              });
        })

        socket.on("typing",async({to}) =>{
            const toUser:any = await findUser(to)
            io.to(toUser?.socket_id).emit("typing");
        })

        socket.on("stop typing", async({ to }) => {
            const toUser: any= await findUser(to)
            io.to(toUser?.socket_id).emit("stop typing");
          });

        socket.on("end",async(data:string) =>{
          console.log("user disconnect the socket")
            const status = data
            await changeStatus(socket.data.userId,socket.id,status)
            socket.disconnect(true)
        })
    })
}

export default socketConfig