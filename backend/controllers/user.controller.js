import { findUserByEmail, createUser } from "../dao/user.dao";

export const userSignUp=async (req, res) => {
    try{
        const {name, email, password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Enter valid input'
            });
        }

        const userExist=await findUserByEmail(email);

        if(userExist.success==='true'){
            return res.status(409).json({
                success: false,
                message: userExist.message
            });
        }

        if(userExist.success==='failed'){
            return res.status(500).json({
                success: false,
                message: userExist.message
            });
        }

        const newUser=await createUser(name, email, password);
        const token=await jsonwebtoken.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        req.user=newUser;

        res.cookies("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "Lax",
            maxAge: 1000*60*60
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully'
        });
    } catch(error){
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const userLogin=async (req, res) => {
    try{
        const{ email, password }=req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const foundUser=await findUserByEmail(email);

        if(foundUser.success==='false'){
            return res.status(404).json({
                success: false,
                message: foundUser.message
            });
        }

        if(foundUser.success==='failed'){
            return res.status(500).json({
                success: false,
                message: foundUser.message
            });
        }

        const user=foundUser.user;
        const isPasswordValid=await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token=jsonwebtoken.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        req.user=user;

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "Lax",
            maxAge: 1000*60*60
        });

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });

    } catch(error){
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};