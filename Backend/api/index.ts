import { createApp } from "../src/app";
import { connectDB } from "../src/config/db";

let isConnected = false;

const app = createApp();

export default async (req: any, res: any) => {
  // Set CORS headers explicitly for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  
  return app(req, res);
};
