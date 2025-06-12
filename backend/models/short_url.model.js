import mongoose from 'mongoose';
import urlUser from './user.model.js';

const shortUrlSchema=new mongoose.Schema({
    full_url:{
        type: String,
        required: true
    },
    short_url:{
        type: String,
        required: true
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "urlUser"
    }
});

const shortUrl=mongoose.model("shortUrl", shortUrlSchema);
export default shortUrl;