import express from "express"
import {verifyInstructor, verifyJWT} from "../middleware/authMiddleware.js"
import {instructorGetCourseController, instructorCreateCourseController,
        instructorUploadVideoController, instructorViewCreatedCourseController,
        instructorUploadQuizController,
        instructorViewOverallProgressController

} from "../controllers/instructor.controller.js"
import {body, param} from "express-validator"
import {uploadMiddleware, uploadImageMiddleware} from "../middleware/videoMiddleware.js"


const instructorRouter= express.Router()


// get a perticular course
instructorRouter.get("/course/:courseId", [
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("courseId must be a mongoDB objectID")
], verifyJWT, verifyInstructor,instructorGetCourseController )


// create Course
// messed up so now only using one instructor Per Course
instructorRouter.post("/createcourse",uploadImageMiddleware.single("image"), [
    body("courseName")
        .notEmpty().withMessage("Course name is required")
        .isString().withMessage("Course name must be a string")
        .isLength({min: 5}).withMessage("Course name must be at least 5 character Long"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .isLength({min: 20}).withMessage("Description must be at least 20 character Long"),
    body("level")
        .notEmpty().withMessage("Course Level  is required")
        .isString().withMessage("Course Level must be a string")
        .isIn(["Beginner", "Intermediate", "Advanced"]).withMessage("Level must be one of these 'Beginner', 'Intermediate', 'Advanced'"),
    body("instructors")
        .isArray().withMessage("Instructor must be an array"),
    body("instructors.*")
        .isMongoId().withMessage("Each instructor must be a valid MongoDB ObjectId"),

], verifyJWT, verifyInstructor, instructorCreateCourseController)

// upload videos
instructorRouter.post("/uploadvideo",[
    body("title")
        .notEmpty().withMessage("Video Title is Required")
        .isLength({min: 5}).withMessage("Video Title must be at least 5 character long")
        .isString().withMessage("Video Title must be a string"),
    body("course")
        .notEmpty().withMessage("Course is Required")
        .isMongoId().withMessage("Course must be a valid mongoDB ID"),
    body("order")
        .notEmpty().withMessage("Order is Required")
        .isInt({ min: 1 }).withMessage("Order must be a positive integer"),
], verifyJWT, verifyInstructor, 
uploadMiddleware.single("video"), instructorUploadVideoController)

// view created course
instructorRouter.get("/viewcreatedcourse", verifyJWT, verifyInstructor, instructorViewCreatedCourseController)


// upload quiz to their course
instructorRouter.post("/uploadquiz/:courseId",[
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("courseId must be a mongoDB objectID"),
    body("quiz")
        .isArray({ min: 1 }).withMessage("Quiz must be an non empty array"),
    body("quiz.*.question")
        .notEmpty().withMessage("Question is required")
        .isString().withMessage("Question must be a string"),
    body("quiz.*.options")
        .isArray({ min: 1 }).withMessage("Options must be an non empty array"),
    body("quiz.*.options.*")
        .notEmpty().withMessage("options is required")
        .isString().withMessage("Options must be a string"),
    body("quiz.*.answer")
        .notEmpty().withMessage("answer is required")
        .isInt({min: 0}).withMessage("answer can not be negetive"),
    
], verifyJWT, verifyInstructor, instructorUploadQuizController)


// view overall course Progress
instructorRouter.get("/viewoverallprogress/:courseId",[
    param("courseId")
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("courseId must be a mongoDB objectID"),
],verifyJWT, verifyInstructor, instructorViewOverallProgressController)


export default instructorRouter