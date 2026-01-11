import express from "express";
import cors from "cors";
import morgan from "morgan";
import { json } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/users/user.routes";
import { expenseRouter } from "./modules/expenses/expense.routes";
import { budgetRouter } from "./modules/budgets/budget.routes";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes";
import { aiRouter } from "./modules/ai/ai.routes";
import { errorHandler } from "./middlewares/error.middleware";

export const createApp = () => {
  const app = express();

  // CORS configuration
  app.use(cors({
    origin: [
      'http://localhost:5173',
      'https://fintech-ai-client.vercel.app',
      /\.vercel\.app$/
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.use(json());
  app.use(morgan("dev"));

  // Health check
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Root endpoint
  app.get("/", (_req, res) => {
    res.json({ 
      message: "FinanceAI Backend API",
      status: "running",
      version: "1.0.0"
    });
  });

  // Ignore favicon requests
  app.get("/favicon.ico", (_req, res) => res.status(204).end());
  app.get("/favicon.png", (_req, res) => res.status(204).end());

  // Feature modules
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/expenses", expenseRouter);
  app.use("/budgets", budgetRouter);
  app.use("/dashboard", dashboardRouter);
  app.use("/ai", aiRouter);

  // Global error handler
  app.use(errorHandler);

  return app;
};


