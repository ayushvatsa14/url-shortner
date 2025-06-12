import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.dao.js";
import { getShortUrl } from "../dao/short_url.dao.js";
import dotenv from "dotenv";

dotenv.config();

export const createShortUrl=async (req, res) => {
    const data=req.body;
    const userId=req.user?._id;

    if(!/^https?:\/\//i.test(data.url)){
        data.url='https://' + data.url;
    }

    const short_url=generateNanoId(7);
    const result=await saveShortUrl(short_url, data.url, userId);

    if(!result.success){
        return res.status(500).json({
            success: false,
            message: result.message
        });
    }

    return res.status(200).json({
        success: true,
        message: "Short url created successfully",
        short_url: process.env.APP_URL + short_url
    });
}

export const redirectFromShortUrl=async (req, res) => {
    try{
        const {id}=req.params;
        const url=await getShortUrl(id);

        if(!url){
            return res.status(404).json({
                success: false,
                message: "Url not found"
            });
        }

        res.redirect(url.full_url);
    } catch(error){
        console.log(`Error: ${error.message}`);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}