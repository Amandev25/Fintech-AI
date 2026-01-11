import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  monthlyIncome?: number;
  savingsGoal?: number;
  preferences?: {
    emailNotifications?: boolean;
    budgetWarnings?: boolean;
    twoFactorEnabled?: boolean;
  };
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    monthlyIncome: { type: Number },
    savingsGoal: { type: Number },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      budgetWarnings: { type: Boolean, default: true },
      twoFactorEnabled: { type: Boolean, default: false },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User = mongoose.model<IUser>("User", userSchema);


