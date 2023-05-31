import { Server } from 'socket.io';
import { AuthService } from '../services/authService';
import { changeStatus, getUsersAleredyChated, checkExistConversation, createNewChat, getMessages, textMessage, fileMessage, findUser} from './mangingChat';
import { s3ServiceInterface } from '../../application/services/s3ServiceInterface';
import { UserInterface } from '../../types/userInterface';
import {callNOtPicked, startAudioCall, callAccepted, callDenied, userIsBusy} from './managingCalls'

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

          //calls

        socket.on("audio_call_not_picked", async(data) => {
          const { to, from } = data;
          const to_user:any = await callNOtPicked(data)
          io.to(to_user?.socket_id).emit("audio_call_missed", {
            from,
            to,
          });
        })

        socket.on("start_audio_call",async(data) => {
          const { from, to, roomID }:any = data;
          const {to_user,from_user}:any = await startAudioCall(data)
          io.to(to_user?.socket_id).emit("audio_call_notification", {
            from: from_user,
            roomID,
            streamID: from,
            userID: to,
            userName: to,
          });
        })

        socket.on("audio_call_accepted",async(data) => {
          const { to, from } = data;
          const from_user:any = await callAccepted(data)
          io.to(from_user?.socket_id).emit("audio_call_accepted", {
            from,
            to,
          });
        })

        socket.on("audio_call_denied",async(data) => {
          const { to, from } = data;
          const from_user:any = await callDenied(data)
          io.to(from_user?.socket_id).emit("audio_call_denied", {
            from,
            to,
          });
        })

        socket.on("user_is_busy_audio_call", async (data) => {
          const { to, from } = data;
          const from_user:any = await userIsBusy(data)
          io.to(from_user?.socket_id).emit("on_another_audio_call", {
            from,
            to,
          });
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