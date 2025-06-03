import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB=async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connection Successful"))
    .catch(error =>{
    console.log(`"Error": ${error.message}`);
    process.exit(1);
    });
}