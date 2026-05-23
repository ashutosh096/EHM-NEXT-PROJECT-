import express from "express";
import mongoose from "mongoose";
import dns from "dns";

import { BlogUserRouter } from "./routes/BlogUser";
import { CaseStudyUserRouter } from "./routes/CaseStudyUser";
import { ArticleUserRouter } from "./routes/ArticleUser";
import { NewsletterUserRouter } from "./routes/NewsLetterUser";
import { ContactUserRouter } from "./routes/ContactUser";
import { FootprintUserRouter } from "./routes/FootprintUser";

dns.setDefaultResultOrder("ipv4first");

const publicApp = express();

publicApp.set("trust proxy", 1);
publicApp.use(express.json());

let connectionPromise: Promise<typeof mongoose> | null = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 10000,
      })
      .then((connection) => connection)
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
}

publicApp.get("/hello", (_req, res) => {
  res.status(200).send("Hello World");
});

publicApp.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    res.status(503).json({
      message: "Database connection is unavailable. Please try again shortly.",
    });
  }
});

publicApp.use("/", BlogUserRouter);
publicApp.use("/", CaseStudyUserRouter);
publicApp.use("/", ArticleUserRouter);
publicApp.use("/", NewsletterUserRouter);
publicApp.use("/", ContactUserRouter);
publicApp.use("/", FootprintUserRouter);

export default publicApp;
