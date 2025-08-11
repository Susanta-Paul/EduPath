import {validationResult} from "express-validator"
import { createEnrollmentService, increseProgressService } from "../service/student.service.js"
import enrollmentModel from "../models/enrollment.model.js"
import courseModel from "../models/course.models.js"
import videoModel from "../models/video.model.js"
import commentModel from "../models/comment.model.js"
import quizModel from "../models/quiz.model.js"


export const studentMakeEnrollmentController=async (req, res, next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {courseId, username} = req.body

    try {

        const newEnrollment= await createEnrollmentService({courseId, studentId: req.user._id})

        res.status(201).json({newEnrollment})
        
    } catch (error) {
        const statusCode=error.statusCode || 500
        res.status(statusCode).json({errors: error.message})
    }

}

export const studentViewEnrollmentController= async (req, res, next)=>{
    try {
        
        // using nested populate to get the obj with requied field
        
        const allEnrollment= await enrollmentModel
            .find({student: req.user._id})
            .populate({
                path: "course",
                select: "courseName duration level"
            })

        res.status(200).json({allEnrollment})
    } catch (error) {
        res.status(500).json({errors: error})
    }
}

export const studentViewCourseController= async (req, res, next)=>{
    
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    try {

        const courseId= req.params.courseId
        
        // find course
        const course= await courseModel.findOne({_id: courseId}).populate({
            path: "instructors",
            select: "fullname username"
        })
        if(!course){
            return res.status(404).json({message: "No course Found"})
        }
    
        // if student enroll in this course
        
        const enrollment= await enrollmentModel.findOne({student: req.user._id, course: courseId})

        // getting all courses videos title and order
        const allCourseVideos= await videoModel.find({course: courseId}).select("title order")
        
        
        if(enrollment){
            return res.status(200).json(
                {
                    enroll: true, course: course, 
                    allVideos: allCourseVideos,
                    enrollment
                }
            )
        }


        res.status(200).json({enroll: false, course: course, allVideos: allCourseVideos})

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const studentGetVideoController= async (req, res, next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const videoId= req.params.videoId

        const video= await videoModel.findById(videoId)
        if(!video){
            return res.status(404).json({message: "No Video Found"})
        }

        const enrollment=await enrollmentModel.findOne({student: req.user._id, course: video.course})
        if(!enrollment){
            return res.status(401).json({message: "You are not Enrolled in this Course"})
        }

        // Increment views for this video
        video.views += 1;
        await video.save();

        res.status(200).json({video})

    } catch (error) {
        res.status(500).json({errors: "Server Error"})
    }

}

export const studentMarkVideoController= async (req, res, next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const videoId= req.params.videoId

        const video= await videoModel.findById(videoId)
        if(!video){
            return res.status(404).json({message: "No Video Found"})
        }

        const enrollment=await enrollmentModel.findOne({student: req.user._id, course: video.course})
        if(!enrollment){
            return res.status(401).json({message: "You are not Enrolled in this Course"})
        }

        // checking if it already mark as completed
        const alreadyCompleted=enrollment.completedVideosIds.some(id=> id.equals(video._id))
        if(alreadyCompleted){
            return res.status(400).json({message: "Video already mark as completed"})
        }

        // marking as completed
        enrollment.completedVideosIds.push(video._id)
        await enrollment.save()

        // increase the progress
        await increseProgressService({enrollmentObj: enrollment})


        res.status(200).json({message: "video marked complete successfully"})

    } catch (error) {
        res.status(500).json({errors: "Server Error"})
    }

}

export const studentAddCommentController= async (req, res, next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {videoId, content}= req.body

        const video= await videoModel.findById(videoId)
        if(!video){
            return res.status(404).json({message: "No Video Found"})
        }

        const enrollment=await enrollmentModel.findOne({student: req.user._id, course: video.course})
        if(!enrollment){
            return res.status(401).json({message: "You are not Enrolled in this Course"})
        }

        const newComment= await commentModel.create({
            username: req.user.username,
            content: content,
            video: videoId
        })

        res.status(201).json({message: `Comment successfully added on the video:${videoId}`, newComment})

    } catch (error) {
        res.status(500).json({errors: "Server Error"})
    }

}

export const studentSubmitQuizController= async (req, res, next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const quizId=req.params.quizId
        const answers= req.body

        const quiz= await quizModel.findById(quizId)
        if(!quiz){
            return res.status(404).json({message: "No such quiz found"})
        }

        const enrollment=await enrollmentModel.findOne({student: req.user._id, course: quiz.course})
        if(!enrollment){
            return res.status(401).json({message: "You are not Enrolled in this Course"})
        }

        const allquiz= quiz.allQues
        let score=0
        let total=0

        if(answers.length!==allquiz.length){
            return res.status(400).json({message: "Submit all qustion and/or only valid questions"})
        }

        for (const ques of answers) {
            const question = allquiz[ques.questionIdx];
            if (!question) {
                return res.status(400).json({
                    message: `Invalid question index: ${ques.questionIdx}`
                });
            }

            if (question.answer === ques.choosenOptionIdx) {
                score += 1;
            }
            total += 1;
        }


        enrollment.completedQuizzes.push({Quiz: quizId, total, score})
        await enrollment.save()

        // increase the progress
        await increseProgressService({enrollmentObj: enrollment})

        res.status(201).json({message: `Quiz successfully reviewed`, enrollment})

    } catch (error) {
        res.status(500).json({errors: "Server Error"})
    }

}


