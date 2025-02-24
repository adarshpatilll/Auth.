import { configDotenv } from "dotenv";
configDotenv({
   path: "./.env",
});
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
   process.env.LOCAL_FRONTEND_URL,
   process.env.VERCEL_FRONTEND_URL_1,
   process.env.VERCEL_FRONTEND_URL_2,
   process.env.VERCEL_FRONTEND_URL_3,
];

app.use(
   cors({
      origin: function (origin, cb) {
         if (!origin || allowedOrigins.includes(origin)) {
            cb(null, true);
         } else {
            cb(new Error("Not allowed by CORS"));
         }
      },
      credentials: true,
   })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export default app;
