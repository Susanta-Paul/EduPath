import { v2 as cloudinary } from "cloudinary";
import AppError from "../libs/customErrors.js"
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
  });



export const uploadToCloudinary= async (imageBuffer, mimetype)=>{
    
    // Upload an image

    try {
        const base64Image = `data:${mimetype};base64,${imageBuffer.toString("base64")}`;

    
        const uploadResult = await cloudinary.uploader
           .upload(
                base64Image, {
                   resource_type: "image",
                   folder: "edupath"
                }
            )
            .catch((error) => {
               console.log(error);
            });
        
        const url= uploadResult.url
        return url
    } catch (error) {
        throw new AppError(500, `Cloudinary upload failed: ${error.message}`)
    }
}
