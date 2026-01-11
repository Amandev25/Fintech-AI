import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBudget extends Document {
  userId: Types.ObjectId;
  category: string;
  allocated: number;
}

const budgetSchema = new Schema<IBudget>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    allocated: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Budget = mongoose.model<IBudget>("Budget", budgetSchema);


