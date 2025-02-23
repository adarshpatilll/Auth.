import { configDotenv } from "dotenv";
configDotenv({
   path: "./.env",
});
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(
   cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
   })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export default app;
