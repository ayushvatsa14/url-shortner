import urlUserSchema from "../models/user.model";

export const findUserByEmail=async (email) => {
    try{
        const userExist=await urlUserSchema.findOne({email});
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
    return await urlUserSchema.findOne({_id});
};

export const createUser=async (name, email, password) => {
    try{
        const hashedPassword=await bcrypt.hash(password, 10);
        const newUser=new urlUserSchema({name, email, password: hashedPassword});
        await newUser.save();
        return newUser;
    } catch(error){
        console.log(error.message);
    }
};