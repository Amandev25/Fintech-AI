import { createApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  const app = createApp();

  app.listen(env.port, () => {
    console.log(` Server running on http://localhost:${env.port}`);
  });
};

startServer().catch((error) => {
  console.error(" Failed to start server", error);
  process.exit(1);
});


