import jwt from 'jsonwebtoken';
import { findUserById } from '../dao/user.dao.js';

export const attachUser=async (req, res, next) => {
    try{
        const token=req.cookies.accessToken;

        if(!token){
            return next();
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const user=await findUserById(decoded.id);

        if(!user){
            return next();
        }

        req.user=user;
        next();
    } catch(error){
        console.log(error.message);
        next();
    }
};