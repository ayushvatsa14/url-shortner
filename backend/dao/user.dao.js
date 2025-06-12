import urlUser from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import shortUrl from "../models/short_url.model.js";

export const findUserByEmail=async (email) => {
    try{
        const userExist=await urlUser.findOne({email});
        let result;

        if(userExist){
            result={
                success: 'true',
                message: 'User exist',
                user: userExist
            };
        }
        else{
            result={
                success: 'false',
                message: 'User does not exist'
            };
        }

        return result;
    } catch(error){
        console.log(error.message);

        const result={
            success: 'failed',
            message: 'Internal server error'
        };

        return result;
    }
};

export const findUserById=async (_id) => {
    return await urlUser.findOne({_id});
};

export const createUser=async (name, email, password) => {
    try{
        const hashedPassword=await bcrypt.hash(password, 10);
        const newUser=new urlUser({name, email, password: hashedPassword});
        await newUser.save();
        return newUser;
    } catch(error){
        console.log(error.message);
    }
};

export const getAllUserUrlsDao=async (id) => {
    //const objectId=new mongoose.Types.ObjectId(id);
    const data=await shortUrl.find({user: id});
    return data;
}