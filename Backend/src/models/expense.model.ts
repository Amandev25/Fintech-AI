import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExpense extends Document {
  userId: Types.ObjectId;
  amount: number;
  category: string;
  date: Date;
  description: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Expense = mongoose.model<IExpense>("Expense", expenseSchema);


