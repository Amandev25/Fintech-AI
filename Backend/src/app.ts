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
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://fintech-ai-client.vercel.app',
        'https://fintech-ai-frontend.vercel.app'
      ];
      
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list or is a vercel.app domain
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400 // 24 hours
  }));
  
  // Handle preflight requests
  app.options('*', cors());
  
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


