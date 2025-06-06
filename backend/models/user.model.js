import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    nmae: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        requred: true
    },
    password: {
        type: String,
        requred: true
    }
});

const urlUserSchema=mongoose.model("urlUserSchema", userSchema);
export default urlUserSchema;