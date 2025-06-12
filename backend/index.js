import express from "express";
const app=express();
import dotenv from "dotenv";
import { connectDB } from "./config/mongo.config.js";
import short_url_router from "./routes/short_url.router.js";
import auth_router from "./routes/auth.router.js";
import user_router from "./routes/user.router.js"
import { redirectFromShortUrl } from "./controllers/short_url.controller.js";
import cookieParser from "cookie-parser";
import { attachUser } from "./utils/attachUser.js";
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(express.json());
dotenv.config();
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(attachUser);

app.use("/api/user", user_router);
app.use("/api/create", short_url_router);
app.get("/:id", redirectFromShortUrl);
app.use("/api/auth", auth_router);

const port=process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
});

connectDB();