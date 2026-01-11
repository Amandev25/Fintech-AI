import { Router } from "express";
import { updateProfile } from "./user.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.put("/profile", requireAuth, updateProfile);


