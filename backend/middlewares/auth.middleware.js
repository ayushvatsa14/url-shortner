import jwt from "jsonwebtoken";
import { findUserById } from "../dao/user.dao.js";

export const authMiddleware=async (req, res, next) => {
    try{
        const token=req.cookies.accessToken;
        
        if(!token){
            return res.status(401).json({
                success: false, 
                message: "Unauthorized"
            });
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const user=await findUserById(decoded.id);

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch(error){
        return res.status(401).json({
            success: false, message: "Invalid token"
        });
    }
};
