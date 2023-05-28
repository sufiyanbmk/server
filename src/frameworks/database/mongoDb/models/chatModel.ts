import mongoose, { Schema, model } from "mongoose";

const chatModel = new Schema(
    {
        participants: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        messages: [
          {
            to: {
              type:mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            from: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            type: {
              type: String,
              enum: ["Text", "Media","File", "Document", "Link"],
            },
            created_at: {
              type: Date,
              default: Date.now(),
            },
            text: {
              type: String,
            },
            file: {
              type: String,
            },
          },
        ],
      }
)

const Chat = model("Chat", chatModel, "chat")
export default Chat;