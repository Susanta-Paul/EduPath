import {validationResult} from "express-validator"
import courseModel from "../models/course.models.js"
import {createCourseService, createNewVideoService} from "../service/instructor.service.js"


export const instructorGetCourseController= async (req, res, next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const courseId= req.params.courseId

        const course= await courseModel.findById(courseId)
        if(!course){
            return res.status(404).json({message: "No course Found"})
        }

        res.status(200).json({enroll: false, message:"Successfully get the course", course})

    } catch (error) {
        res.status(500).json({errors: error})
    }
}

export const instructorCreateCourseController= async (req, res, next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {

        const {courseName, description, level, instructors}= req.body

        const newCourse= await createCourseService({courseName, description, level, instructors})

        res.status(201).json({message: "Course Created Successfully", course: newCourse})
        
    } catch (error) {
        const status = error.statusCode || 500;

        // If Mongoose ValidationError was wrapped by AppError
        if (status === 400 && error.message.includes("Course validation failed")) {
        return res.status(400).json({
            errors: error.message.replace("Course validation failed: ", "").split(",")
        });
        }

        // Fallback
        res.status(status).json({
        errors: Array.isArray(error.message) ? error.message : [error.message || "Internal Server Error"]
        });
    }

}

export const instructorUploadVideoController= async (req, res, next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    if(!req.file){
        return res.status(400).json({errors: "A valid video file is required"})
    }

    try {
        const {title, course, order}=req.body
        const videoFile= req.file // because we are storing the file in buffer memory

        const newVideo= await createNewVideoService({title, courseId:course, order, videoFile})

        res.status(201).json({message: "Video Uploaded Successfully", newVideo})

    } catch (error) {
        const status=error.statusCode || 500
        res.status(status).json({errors: error.message || "Internal Server Error"})
    }

}