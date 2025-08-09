import enrollmentModel from "../models/enrollment.model.js"
import AppError from "../libs/customErrors.js"
import courseModel from "../models/course.models.js"
import quizModel from "../models/quiz.model.js"
import videoModel from "../models/video.model.js"


export const createEnrollmentService= async ({courseId, studentId})=>{

    if(!courseId || !studentId){
        throw new AppError(400, "CourseId and Username both required")
    }

    const checkCourse= await courseModel.findOne({_id: courseId})

    if(!checkCourse){
        throw new AppError(404, "No such Course Exists")
    }
    
    const existingEnrollment= await enrollmentModel.findOne({
        course: courseId, student: studentId
    })
    if(existingEnrollment){
        throw new AppError(400, "Student already enrolled in this Course")
    }

    const newEnrollment= await enrollmentModel.create({
        course: courseId, student: studentId
    })

    return newEnrollment

}

export const increseProgressService= async ({enrollmentObj})=>{

    // get all the quiz and video related to this course
    const quizzes= await quizModel.find({course: enrollmentObj.course})
    const videos= await videoModel.find({course: enrollmentObj.course})

    let total=quizzes.length + videos.length
    let completed=0

    completed= enrollmentObj.completedVideosIds.length + enrollmentObj.completedQuizzes.length

    const progress= (completed/total) *100

    enrollmentObj.progress=progress
    await enrollmentObj.save()

}

