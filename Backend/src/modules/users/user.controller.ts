import { Response } from "express";
import { User } from "../../models/user.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, monthlyIncome, savingsGoal, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, monthlyIncome, savingsGoal, preferences },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      monthlyIncome: user.monthlyIncome,
      savingsGoal: user.savingsGoal,
      preferences: user.preferences,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};


