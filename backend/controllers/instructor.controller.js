import {validationResult} from "express-validator"
import courseModel from "../models/course.models.js"
import {createCourseService, createNewVideoService, createNewQuizService} from "../service/instructor.service.js"
import videoModel from "../models/video.model.js"
import enrollmentModel from "../models/enrollment.model.js"


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

        const allCourseVideos= await videoModel.find({course: courseId}).select("title order")

        res.status(200).json({enroll: false, message:"Successfully get the course", course, allVideos: allCourseVideos})

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

        const newVideo= await createNewVideoService({title, courseId:course, order, videoFile, userId: req.user._id})

        res.status(201).json({message: "Video Uploaded Successfully", newVideo})

    } catch (error) {
        const status=error.statusCode || 500
        res.status(status).json({errors: error.message || "Internal Server Error"})
    }
}


export const instructorViewCreatedCourseController= async (req, res, next)=>{

    try {
        const userId= req.user._id
    
        const allCourses= await courseModel.find({instructors: { $in: [userId]}})

        res.status(200).json({allCourses})
    } catch (error) {
        res.status(500).json({errors: error})
    }

}

export const instructorUploadQuizController= async (req, res, next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }

    try {

        const courseId= req.params.courseId
        const {quiz}= req.body

        const course= await courseModel.findById(courseId)
        if(!course){
            return res.status(404).json({message: "No course Found"})
        }

        if(!course.instructors.some(id=> id.toString()===req.user._id.toString())){
            return res.status(403).json({message: "Only Course Instructor can upload Quiz"})
        }

        const newQuiz = await createNewQuizService({courseId, uploaderId: req.user._id, allQuizes: quiz})
        
        res.status(201).json({message: "Quiz successfully uploaded",newQuiz})
        
    } catch (error) {
        const statusCode= error.statusCode || 500
        res.status(statusCode).json({errors: errors.message || "Internal Server Error"})
    }

}

export const instructorViewOverallProgressController= async (req, res, next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }

    try {
        const courseId= req.params.courseId

        const course= await courseModel.findById(courseId)

        if(!course){
            return res.status(404).json({messsage: "No course Found"})
        }

        if(!course.instructors.some(id=>id.toString()===req.user._id.toString())){
            return res.status(403).json({message: "Only course Instructors can view the progress"})
        }

        const students= await enrollmentModel.find({course: courseId}).select("progress")

        let prog= 0

        students.forEach((student)=>{
            prog+=student.progress
        })

        const overall= prog/students.length

        res.status(200).json({message: "successfully get the overall progress", overallProgrss: overall})

    } catch (error) {
        res.status(500).json({errors: error})
    }

}