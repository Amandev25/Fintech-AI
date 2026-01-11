import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChatMessage extends Document {
  userId: Types.ObjectId;
  message: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  sender: { type: String, enum: ["user", "ai"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export const ChatMessage = mongoose.model<IChatMessage>(
  "ChatMessage",
  chatMessageSchema
);


