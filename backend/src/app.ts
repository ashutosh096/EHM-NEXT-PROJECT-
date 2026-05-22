import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import dns from "dns";

// Force Node to prefer IPv4 DNS resolution to fix MongoDB querySrv ECONNREFUSED on Windows
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("Failed to set DNS servers:", e);
}
import { AuthAdminRouter } from "./routes/AuthAdmin";
import { BlogUserRouter } from "./routes/BlogUser";
import { BlogAdminRouter } from "./routes/BlogAdmin";
import { NewsletterUserRouter } from "./routes/NewsLetterUser";
import { NewsletterAdminRouter } from "./routes/NewsLetterAdmin";
import { ArticleAdminRouter } from "./routes/ArticleAdmin";
import { ArticleUserRouter } from "./routes/ArticleUser";
import { ContactUserRouter } from "./routes/ContactUser";
import { FootprintAdminRouter } from "./routes/FootprintAdmin";
import { FootprintUserRouter } from "./routes/FootprintUser";
import { CaseStudyAdminRouter } from "./routes/CaseStudyAdmin";
import { CaseStudyUserRouter } from "./routes/CaseStudyUser";
import VidUser from "./routes/VidUser";

// Load .env from project root
dotenv.config();

const app = express();

// Trust reverse proxy (e.g. Vercel/Render) for rate limiting
app.set("trust proxy", 1);

// CORS — allow localhost:3000 (Next.js dev), production domains, and Render
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://ehmconsultancy.co.in",
      "https://www.ehmconsultancy.co.in",
      "https://ehm-ft.onrender.com",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB only once (avoid re-connecting on every hot reload)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment");
    }
    console.log("Attempting MongoDB connect. MONGO_URL:", process.env.MONGO_URL, "DNS servers:", dns.getServers());
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
  }
}

connectDB();

app.use("/hello", (req: any, res: any) => {
  res.send("Hello World");
});

// Admin auth routes
app.use("/admin", AuthAdminRouter);

// Admin Blog routes
app.use("/admin", BlogAdminRouter);

// User Blog routes
app.use("/", BlogUserRouter);

// Admin case study routes
app.use("/admin", CaseStudyAdminRouter);

// User case study routes
app.use("/", CaseStudyUserRouter);

// Admin Article routes
app.use("/admin", ArticleAdminRouter);

// User Article routes
app.use("/", ArticleUserRouter);

// Serve static files from uploads folder
app.use("/uploads", express.static(path.resolve("uploads")));

// User newsletter route
app.use("/", NewsletterUserRouter);

// Admin newsletter route
app.use("/admin", NewsletterAdminRouter);

// User Contact route
app.use("/", ContactUserRouter);

// Admin footprint route
app.use("/admin", FootprintAdminRouter);

// User footprint route
app.use("/", FootprintUserRouter);

app.use("/videos", VidUser);

export default app;
