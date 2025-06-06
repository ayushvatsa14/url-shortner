import shortUrl from "../models/short_url.model.js";

export const saveShortUrl=async (short_url, url, userId) => {
    try{
        const newUrl=new shortUrl({
            full_url: url,
            short_url: short_url
        });

        if(userId){
            newUrl.user=userId;
        }

        await newUrl.save();
        const result={
            success: true,
            message: 'Url saved successsfully'
        };

        return result;
    } catch(error){
        console.log(`Error: ${error.message}`);

        const result={
            success: false,
            message: error.message
        };

        return result;
    }
}

export const getShortUrl=async (short_url) => {
    return await shortUrl.findOneAndUpdate({short_url: short_url}, {$inc: {clicks: 1}});
}