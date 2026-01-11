import { createApp } from "../src/app";
import { connectDB } from "../src/config/db";

let isConnected = false;
let cachedApp: any = null;

export default async (req: any, res: any) => {
  // Set CORS headers explicitly for Vercel - MUST be first
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Type');
  
  // Handle preflight immediately
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  try {
    // Connect to DB once
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    
    // Create app once
    if (!cachedApp) {
      cachedApp = createApp();
    }
    
    // Handle request
    return cachedApp(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
