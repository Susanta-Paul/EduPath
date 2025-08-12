import courseModel from "../models/course.models.js";
import AppError from "../libs/customErrors.js"
import videoModel from "../models/video.model.js"
import ImageKit from "imagekit";
import axios from "axios"
import FormData from "form-data";
import courseModel from "../models/course.models.js";
import quizModel from "../models/quiz.model.js"
import cloudinary from "../config/cloudinaryConfig.js"


const uploadToCloudinary= async (imageBuffer, mimetype)=>{
    
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
        
        const url= await uploadResult.url
        return url
    } catch (error) {
        throw new AppError(500, `Cloudinary upload failed: ${error.message}`)
    }
}



export const createCourseService= async ({courseName, description, level, instructors, imageBuffer, mimetype})=>{

    if(!courseName || !description || !level || !instructors || !imageBuffer){
        throw new AppError(400, "All fields are required")
    }

    try {
        
        // upload the file in cloudinary 

        const imageUrl= await uploadToCloudinary(imageBuffer, mimetype)
        
        const newCourse= await courseModel.create({courseName, description, level, instructors, image:imageUrl})

        return newCourse

    } catch (error) {
        if(error.name=="ValidationError"){
            throw new AppError(400, error.message)
        }
        else{
            throw new AppError(500, error.message || "Internal Server Error")
        }
    }
}

const uploadToImageKit= async ({videoFile})=>{

    const formData = new FormData();

    // Append file from multer memoryStorage
    const uniqueFileName = `${Date.now()}-${videoFile.originalname}`;
    formData.append("file", videoFile.buffer, {
        filename: uniqueFileName,
        contentType: videoFile.mimetype
    });
    formData.append("fileName", uniqueFileName);

    try {
        const response= await axios.post("https://upload.imagekit.io/api/v2/files/upload",
            formData, 
            {
                headers:{
                    ...formData.getHeaders(), // sets Content-Type with correct boundary
                    Accept: 'application/json',
                    Authorization: `Basic ${Buffer.from(`${process.env.IMAGEKIT_PRIVATE_API_KEY}:`).toString("base64")}`
                }
            })

        if (response.status === 200) {
            return {
                success: true,
                fileId: response.data.fileId,
                url: response.data.url,
                name: response.data.name,
                thumbnail: response.data.thumbnailUrl
            };
        } else {
            return {
                success: false,
                status: response.status,
                message: response.statusText,
                data: response.data,
            };
        }
    } catch (error) {
        return error
    }
}


export const createNewVideoService= async ({title, courseId, order, videoFile, userId})=>{

    if(!title || !courseId || !order || !videoFile){
        throw new AppError(400, "All Fields are required")
    }
    
    try {

        // checking if the user is the part of Instructor of the course

        const course= await courseModel.findById(courseId)

        if (!course) {
            throw new AppError(404, "Course not found");
        }

        if (!course.instructors.some(id => id.toString() === userId.toString())) {
            throw new AppError(403, "Only Course Instructors can upload video");
        }


        // checking if there are already video with this order
    
        const existingVideo= await videoModel.findOne({course: courseId, order: order})
    
        if(existingVideo){
            throw new AppError(400, `Video already exists with Order number ${order} in courseId: ${courseId}`)
        }
    
        // uploading the videoFile in ImageKit

        const result= await uploadToImageKit({videoFile})

        if(!result.success){
            throw new AppError(500, "Upload to ImageKit failed") 
        }
        
        // storing the video obj in mongodb

        delete result.success

        const newVideo= await videoModel.create({
            title, course:courseId, order,
            publicUrl: result
        })

        return newVideo


    } catch (error) {
        throw new AppError(500, error.message || "Internal Server Error")
    }

}

export const createNewQuizService= async ({courseId, uploaderId, allQuizes})=>{

    if(!courseId || !uploaderId || !allQuizes){
        throw new AppError(400, "All fields are required")
    }

    try {
        
        const newQuiz= await quizModel.create({
            uploadedBy: uploaderId,
            course: courseId,
            allQues: allQuizes
        })

        return newQuiz

    } catch (error) {
        throw new AppError(500, "Internal Server Error")
    }

}