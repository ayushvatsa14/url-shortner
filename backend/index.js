import express from "express";
const app=express();
import dotenv from "dotenv";
import { connectDB } from "./config/mongo.config.js";
import short_url_router from "./routes/short_url.router.js";
import { redirectFromShortUrl } from "./controllers/short_url.controller.js";

app.use(express.json());
dotenv.config();

app.use("/api/create", short_url_router);
app.get("/:id", redirectFromShortUrl);

const port=process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
});

connectDB();